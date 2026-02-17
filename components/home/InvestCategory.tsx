import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
    { id: 1, name: 'Duration', icon: 'clock', library: FontAwesome5, color: '#1E90FF' }, // Blue
    { id: 2, name: 'Return', icon: 'money-bill-wave', library: FontAwesome5, color: '#2ECC71' }, // Green
    { id: 3, name: 'Low Risk', icon: 'chart-line', library: FontAwesome5, color: '#E74C3C' }, // Red (chart)
    { id: 4, name: 'Safety', icon: 'shield-check', library: MaterialCommunityIcons, color: '#F1C40F' }, // Yellow
];

export const InvestCategory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invest by Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {categories.map((cat) => (
                    <TouchableOpacity key={cat.id} style={styles.card}>
                        <View style={[styles.iconContainer, { backgroundColor: cat.color + '20' }]}>
                            {/* 20 for transparency */}
                            <cat.library name={cat.icon} size={24} color={cat.color} />
                        </View>
                        <Text style={styles.cardText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        paddingHorizontal: 20,
        color: '#333',
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        width: 80,
        height: 90,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
});
