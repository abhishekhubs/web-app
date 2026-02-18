import os
import numpy as np
import tensorflow.lite as tflite
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the TFLite model
MODEL_PATH = "model/leaf_model.tflite"
interpreter = tflite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Labels from your provided list (ensure order matches training)
LABELS = [
    "Chili__healthy",
    "Chili__leaf curl",
    "Chili__leaf spot",
    "Chili__whitefly",
    "Chili__yellowish",
    "Healthy Rice Leaf",
    "Rice_Bacterial Leaf Blight",
    "Rice_Brown Spot",
    "Rice_Leaf blast",
    "Rice_Leaf scald",
    "Rice_Sheath Blight",
    "Tomato__bacterial_spot",
    "Tomato__healthy",
    "Tomato__late_blight",
    "Tomato__septoria_leaf_spot",
    "Wheat__brown_rust",
    "Wheat__healthy",
    "Wheat__septoria",
    "Wheat__yellow_rust"
]

def preprocess_image(image_bytes):
    # Load image
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    
    # Resize to 224x224 (Model Input Shape)
    img = img.resize((224, 224))
    
    # Convert to array and normalize (0-255 -> 0.0-1.0)
    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0
    
    # Add batch dimension [1, 224, 224, 3]
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    try:
        image_bytes = file.read()
        input_data = preprocess_image(image_bytes)
        
        # Run Inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])[0]
        
        # Process Results
        max_index = np.argmax(output_data)
        max_confidence = float(output_data[max_index])
        detected_label = LABELS[max_index] if max_index < len(LABELS) else "Unknown"
        
        result = {
            'disease': detected_label,
            'confidence': round(max_confidence * 100, 2),
            'severity': 'Severe' if max_confidence > 0.8 else 'Moderate' if max_confidence > 0.5 else 'Mild',
            'description': f"Detected {detected_label} with {round(max_confidence * 100)}% confidence."
        }
        
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Host 0.0.0.0 allows access from other devices on the network
    app.run(host='0.0.0.0', port=5000, debug=True)
