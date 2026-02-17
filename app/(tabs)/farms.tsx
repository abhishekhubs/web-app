import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FarmsScreen() {
    const router = useRouter();

    const handleOpenCamera = () => {
        router.push('/disease-detection');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Green Gradient Header */}
            <LinearGradient
                colors={['#0F4C2C', '#1A5D3A', '#2C7A4F']}
                style={styles.gradientHeader}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>All Farms</Text>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={handleOpenCamera}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="camera" size={24} color="#FFFFFF" />
                            <Text style={styles.cameraButtonText}>Disease Detection</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Camera Feature Card */}
                <TouchableOpacity
                    style={styles.featureCard}
                    onPress={handleOpenCamera}
                    activeOpacity={0.8}
                >
                    <View style={styles.featureIconContainer}>
                        <Ionicons name="scan" size={40} color="#2ECC71" />
                    </View>
                    <View style={styles.featureContent}>
                        <Text style={styles.featureTitle}>Crop Disease Detection</Text>
                        <Text style={styles.featureDescription}>
                            Take a photo to identify plant diseases instantly
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#CCC" />
                </TouchableOpacity>

                {/* Placeholder for farms list */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Farms</Text>
                    <View style={styles.emptyState}>
                        <Ionicons name="leaf-outline" size={60} color="#CCC" />
                        <Text style={styles.emptyStateText}>No farms added yet</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Add your first farm to get started
                        </Text>
                    </View>
                </View>

                <View style={{ height: 80 }} />
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
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    cameraButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    featureIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E8F8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    featureDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    section: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    emptyState: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    emptyStateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginTop: 15,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        textAlign: 'center',
    },
});
