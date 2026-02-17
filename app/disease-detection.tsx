import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function DiseaseDetectionScreen() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos');
            return false;
        }
        return true;
    };

    const requestGalleryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Gallery permission is required to select photos');
            return false;
        }
        return true;
    };

    const handleTakePhoto = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelectedImage(result.assets[0].uri);
            analyzeImage(result.assets[0].uri);
        }
    };

    const handleSelectFromGallery = async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelectedImage(result.assets[0].uri);
            analyzeImage(result.assets[0].uri);
        }
    };

    const analyzeImage = async (imageUri: string) => {
        setIsAnalyzing(true);
        setResult(null);

        // Simulate AI analysis (replace with actual API call)
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                disease: 'Leaf Blight',
                confidence: 87,
                severity: 'Moderate',
                treatment: [
                    'Remove affected leaves',
                    'Apply fungicide spray',
                    'Ensure proper drainage',
                    'Increase air circulation'
                ],
                description: 'Leaf blight is a common fungal disease that affects various crops. Early detection and treatment are crucial.'
            });
        }, 2000);
    };

    const handleReset = () => {
        setSelectedImage(null);
        setResult(null);
        setIsAnalyzing(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <LinearGradient
                colors={['#0F4C2C', '#1A5D3A', '#2C7A4F']}
                style={styles.gradientHeader}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Disease Detection</Text>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Image Display */}
                {selectedImage ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={handleReset}
                        >
                            <Ionicons name="close-circle" size={32} color="#E74C3C" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Ionicons name="image-outline" size={80} color="#CCC" />
                        <Text style={styles.placeholderText}>No image selected</Text>
                        <Text style={styles.placeholderSubtext}>
                            Take a photo or select from gallery
                        </Text>
                    </View>
                )}

                {/* Camera Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleTakePhoto}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="camera" size={24} color="#FFFFFF" />
                        <Text style={styles.primaryButtonText}>Take Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleSelectFromGallery}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="images" size={24} color="#2ECC71" />
                        <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>

                {/* Analysis Result */}
                {isAnalyzing && (
                    <View style={styles.resultCard}>
                        <View style={styles.loadingContainer}>
                            <Ionicons name="sync" size={40} color="#2ECC71" />
                            <Text style={styles.loadingText}>Analyzing image...</Text>
                        </View>
                    </View>
                )}

                {result && !isAnalyzing && (
                    <View style={styles.resultCard}>
                        <View style={styles.resultHeader}>
                            <Ionicons name="checkmark-circle" size={32} color="#2ECC71" />
                            <Text style={styles.resultTitle}>Analysis Complete</Text>
                        </View>

                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Disease Detected:</Text>
                            <Text style={styles.resultValue}>{result.disease}</Text>
                        </View>

                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Confidence:</Text>
                            <View style={styles.confidenceContainer}>
                                <View style={styles.confidenceBar}>
                                    <View
                                        style={[
                                            styles.confidenceProgress,
                                            { width: `${result.confidence}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.confidenceText}>{result.confidence}%</Text>
                            </View>
                        </View>

                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Severity:</Text>
                            <View style={[
                                styles.severityBadge,
                                result.severity === 'Severe' && styles.severityBadgeSevere,
                                result.severity === 'Moderate' && styles.severityBadgeModerate,
                                result.severity === 'Mild' && styles.severityBadgeMild,
                            ]}>
                                <Text style={styles.severityText}>{result.severity}</Text>
                            </View>
                        </View>

                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Description:</Text>
                            <Text style={styles.descriptionText}>{result.description}</Text>
                        </View>

                        <View style={styles.resultSection}>
                            <Text style={styles.resultLabel}>Recommended Treatment:</Text>
                            {result.treatment.map((step: string, index: number) => (
                                <View key={index} style={styles.treatmentItem}>
                                    <Ionicons name="checkmark-circle-outline" size={20} color="#2ECC71" />
                                    <Text style={styles.treatmentText}>{step}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    gradientHeader: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        margin: 20,
        height: 300,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#E0E0E0',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    resetButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    placeholderContainer: {
        margin: 20,
        height: 300,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginTop: 15,
    },
    placeholderSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    buttonsContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#2ECC71',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 2,
        borderColor: '#2ECC71',
    },
    secondaryButtonText: {
        color: '#2ECC71',
        fontSize: 16,
        fontWeight: '600',
    },
    resultCard: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 15,
        fontWeight: '500',
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    resultSection: {
        marginBottom: 20,
    },
    resultLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    confidenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    confidenceBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    confidenceProgress: {
        height: '100%',
        backgroundColor: '#2ECC71',
        borderRadius: 5,
    },
    confidenceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        minWidth: 45,
    },
    severityBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    severityBadgeSevere: {
        backgroundColor: '#FFE5E5',
    },
    severityBadgeModerate: {
        backgroundColor: '#FFF4E5',
    },
    severityBadgeMild: {
        backgroundColor: '#E8F8F0',
    },
    severityText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    treatmentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginTop: 10,
    },
    treatmentText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
});
