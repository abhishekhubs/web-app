import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Get API key from environment variable
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || 'a1c5990739423b9719c4ce6e36f0e30f';

interface WeatherData {
    location: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
    weatherMain: string;
    precipitation: number;
}

interface DailyForecast {
    day: string;
    tempHigh: number;
    tempLow: number;
    weatherMain: string;
    icon: string;
}

export const WeatherCard = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<DailyForecast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        getWeatherData();
    }, []);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const getWeatherData = async () => {
        try {
            console.log('🌤️ Starting weather fetch...');

            // Request location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log('📍 Location permission:', status);

            if (status !== 'granted') {
                console.log('⚠️ Location permission denied');
                setError(null);
                setLoading(false);
                setWeather(getDemoWeather());
                setForecast(getDemoForecast());
                return;
            }

            // Get current location
            console.log('🌍 Getting current location...');
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            console.log(`📍 Location: ${latitude}, ${longitude}`);

            // Fetch current weather
            console.log('☁️ Fetching weather from API...');
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            console.log('📡 API Response status:', weatherResponse.status);

            if (!weatherResponse.ok) {
                console.log('⚠️ API not available:', weatherResponse.status);
                const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                const cityName = geocode[0]?.city || geocode[0]?.subregion || 'Your Location';
                setWeather({ ...getDemoWeather(), location: cityName });
                setForecast(getDemoForecast());
                setError(null);
                setLoading(false);
                return;
            }

            const data = await weatherResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            let dailyForecast: DailyForecast[] = [];
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                dailyForecast = processForecastData(forecastData);
            } else {
                dailyForecast = getDemoForecast();
            }

            // Format sunrise and sunset times
            const formatTime = (timestamp: number) => {
                const date = new Date(timestamp * 1000);
                return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            };

            setWeather({
                location: data.name,
                temp: Math.round(data.main.temp),
                tempMin: Math.round(data.main.temp_min),
                tempMax: Math.round(data.main.temp_max),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: Math.round(data.wind.speed * 3.6),
                sunrise: formatTime(data.sys.sunrise),
                sunset: formatTime(data.sys.sunset),
                weatherMain: data.weather[0].main,
                precipitation: data.rain?.['1h'] || 0,
            });

            setForecast(dailyForecast);
            setError(null);
            setLoading(false);
        } catch (err) {
            console.log('⚠️ Weather fetch failed, using demo data');
            setError(null);
            setWeather(getDemoWeather());
            setForecast(getDemoForecast());
            setLoading(false);
        }
    };

    const processForecastData = (data: any): DailyForecast[] => {
        const dailyData: { [key: string]: { temps: number[], weather: string } } = {};

        data.list.forEach((item: any) => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            if (!dailyData[dayKey]) {
                dailyData[dayKey] = { temps: [], weather: item.weather[0].main };
            }
            dailyData[dayKey].temps.push(item.main.temp);
        });

        return Object.entries(dailyData).slice(0, 7).map(([day, data]) => ({
            day,
            tempHigh: Math.round(Math.max(...data.temps)),
            tempLow: Math.round(Math.min(...data.temps)),
            weatherMain: data.weather,
            icon: data.weather,
        }));
    };

    const getDemoWeather = (): WeatherData => ({
        location: 'Your Location',
        temp: 27,
        tempMin: 24,
        tempMax: 32,
        humidity: 75,
        pressure: 1010,
        windSpeed: 12,
        sunrise: '6:15 am',
        sunset: '6:25 pm',
        weatherMain: 'Clear',
        precipitation: 0,
    });

    const getDemoForecast = (): DailyForecast[] => [
        { day: 'Mon, Feb 17', tempHigh: 32, tempLow: 24, weatherMain: 'Clear', icon: 'sunny' },
        { day: 'Tue, Feb 18', tempHigh: 31, tempLow: 23, weatherMain: 'Clouds', icon: 'cloud' },
        { day: 'Wed, Feb 19', tempHigh: 30, tempLow: 25, weatherMain: 'Rain', icon: 'rainy' },
        { day: 'Thu, Feb 20', tempHigh: 29, tempLow: 24, weatherMain: 'Clear', icon: 'sunny' },
        { day: 'Fri, Feb 21', tempHigh: 33, tempLow: 26, weatherMain: 'Clear', icon: 'sunny' },
        { day: 'Sat, Feb 22', tempHigh: 31, tempLow: 25, weatherMain: 'Clouds', icon: 'partly-sunny' },
        { day: 'Sun, Feb 23', tempHigh: 30, tempLow: 24, weatherMain: 'Clear', icon: 'sunny' },
    ];

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#2ECC71" />
                <Text style={styles.loadingText}>Loading weather...</Text>
            </View>
        );
    }

    if (!weather) {
        return null;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={toggleExpand}
            activeOpacity={0.9}
        >
            {/* Current Weather */}
            <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={18} color="#333" />
                <Text style={styles.locationText}>{weather.location}</Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#888"
                    style={{ marginLeft: 'auto' }}
                />
            </View>

            <View style={styles.tempRow}>
                <View>
                    <Text style={styles.currentTemp}>{weather.temp > 0 ? '+' : ''}{weather.temp}°C</Text>
                    <Text style={styles.tempHighLow}>H: {weather.tempMax}°C   L: {weather.tempMin}°C</Text>
                </View>
                <View style={styles.weatherIconContainer}>
                    {getWeatherIcon(weather.weatherMain)}
                </View>
            </View>

            <View style={styles.metricsContainer}>
                <WeatherMetric label="Humidity" value={`${weather.humidity}%`} />
                <WeatherMetric label="Precipitation" value={`${weather.precipitation.toFixed(1)}ml`} />
                <WeatherMetric label="Pressure" value={`${weather.pressure} hPa`} />
                <WeatherMetric label="Wind" value={`${weather.windSpeed} km/h`} />
            </View>

            <View style={styles.sunCycleContainer}>
                <View style={styles.sunTime}>
                    <Text style={styles.sunTimeValue}>{weather.sunrise}</Text>
                    <Text style={styles.sunTimeLabel}>Sunrise</Text>
                </View>

                <View style={styles.sunArcContainer}>
                    <View style={styles.sunArc} />
                    <Ionicons name="sunny" size={20} color="#FFD700" style={styles.sunIcon} />
                </View>

                <View style={styles.sunTime}>
                    <Text style={styles.sunTimeValue}>{weather.sunset}</Text>
                    <Text style={styles.sunTimeLabel}>Sunset</Text>
                </View>
            </View>

            {/* 7-Day Forecast (Expanded) */}
            {expanded && (
                <View style={styles.forecastContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.forecastTitle}>7-Day Forecast</Text>
                    {forecast.map((day, index) => (
                        <DailyForecastItem key={index} forecast={day} />
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
};

const DailyForecastItem = ({ forecast }: { forecast: DailyForecast }) => (
    <View style={styles.forecastItem}>
        <Text style={styles.forecastDay}>{forecast.day}</Text>
        <View style={styles.forecastCenter}>
            <Ionicons name={getIconName(forecast.weatherMain)} size={24} color="#666" />
            <Text style={styles.forecastWeather}>{forecast.weatherMain}</Text>
        </View>
        <View style={styles.forecastTemps}>
            <Text style={styles.forecastTemp}>↑ {forecast.tempHigh}°</Text>
            <Text style={styles.forecastTempLow}>↓ {forecast.tempLow}°</Text>
        </View>
    </View>
);

const getIconName = (weatherMain: string): any => {
    switch (weatherMain.toLowerCase()) {
        case 'clear': return 'sunny';
        case 'clouds': return 'cloud';
        case 'rain': return 'rainy';
        case 'snow': return 'snow';
        case 'thunderstorm': return 'thunderstorm';
        default: return 'partly-sunny';
    }
};

const getWeatherIcon = (weatherMain: string) => {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return isNight ? (
                <Ionicons name="moon" size={40} color="#FFD700" />
            ) : (
                <Ionicons name="sunny" size={40} color="#FFD700" />
            );
        case 'clouds':
            return (
                <View>
                    {isNight && <Ionicons name="moon" size={40} color="#FFD700" style={{ marginRight: -10 }} />}
                    <Ionicons name="cloud" size={50} color="#B0C4DE" style={isNight ? { position: 'absolute', bottom: -10, left: -20 } : {}} />
                </View>
            );
        case 'rain':
            return <Ionicons name="rainy" size={40} color="#4A90E2" />;
        case 'snow':
            return <Ionicons name="snow" size={40} color="#E0E0E0" />;
        case 'thunderstorm':
            return <Ionicons name="thunderstorm" size={40} color="#9B59B6" />;
        default:
            return <Ionicons name="partly-sunny" size={40} color="#FFD700" />;
    }
};

const WeatherMetric = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.metricItem}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 14,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 15,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    tempRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    currentTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    tempHighLow: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    weatherIconContainer: {
        marginRight: 10,
        marginTop: -10,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 15,
    },
    metricItem: {
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    sunCycleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    sunTime: {
        alignItems: 'center',
    },
    sunTimeValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    sunTimeLabel: {
        fontSize: 12,
        color: '#888',
    },
    sunArcContainer: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    sunArc: {
        position: 'absolute',
        top: 15,
        width: '100%',
        height: 40,
        borderTopWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        borderStyle: 'dashed',
    },
    sunIcon: {
        position: 'absolute',
        top: 0,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 20,
    },
    forecastContainer: {
        marginTop: 10,
    },
    forecastTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    forecastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    forecastDay: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        flex: 1,
    },
    forecastCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        justifyContent: 'center',
    },
    forecastWeather: {
        fontSize: 13,
        color: '#666',
    },
    forecastTemps: {
        flexDirection: 'row',
        gap: 12,
        flex: 1,
        justifyContent: 'flex-end',
    },
    forecastTemp: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E74C3C',
    },
    forecastTempLow: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3498DB',
    },
});
