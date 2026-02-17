# How to Get Your Free OpenWeatherMap API Key

## Step 1: Sign Up
1. Go to https://openweathermap.org/api
2. Click "Sign Up" or "Get API Key"
3. Create a free account

## Step 2: Get API Key
1. After signing up, verify your email
2. Log in to your account
3. Go to "API keys" tab
4. Copy your default API key (or create a new one)

## Step 3: Add to Your Project
1. Create a file named `.env` in your project root (same level as package.json)
2. Add this line:
   ```
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual API key

## Step 4: Restart Expo Server
- Stop the current server (Ctrl+C)
- Run `npm start` again

## Important Notes
- ✅ Free tier: 1,000 API calls per day
- ✅ API key takes ~10 minutes to activate after signup
- ⚠️ Never commit your `.env` file to git
- 💡 The app works without API key (uses demo data + real location)

## Testing Without API Key
If you don't set up the API key, the app will:
- Still get your real location name
- Show realistic demo weather data
- Display a small warning message at the bottom
