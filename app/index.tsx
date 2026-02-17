import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#0F4C2C', '#1A5D3A', '#2C7A4F']}
                style={styles.gradient}
            />

            {/* Content */}
            <View style={styles.content}>
                {/* Icon/Logo */}
                <View style={styles.iconContainer}>
                    <Ionicons name="leaf" size={80} color="#FFFFFF" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Farm Investment</Text>
                <Text style={styles.subtitle}>Grow Your Wealth, Naturally</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Discover sustainable farming opportunities and invest in the future of agriculture
                </Text>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    <FeatureItem icon="trending-up" text="High Returns" />
                    <FeatureItem icon="shield-checkmark" text="Secure Investment" />
                    <FeatureItem icon="people" text="Verified Farms" />
                </View>

                {/* Get Started Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="#0F4C2C" />
                </TouchableOpacity>

                {/* Skip Link */}
                <TouchableOpacity onPress={handleGetStarted}>
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const FeatureItem = ({ icon, text }: { icon: any; text: string }) => (
    <View style={styles.featureItem}>
        <Ionicons name={icon} size={24} color="#FFFFFF" />
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 50,
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    featureText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#0F4C2C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
