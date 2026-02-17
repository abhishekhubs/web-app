import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const offers = [
    { id: 1, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }, // Field
    { id: 2, image: 'https://images.unsplash.com/photo-1625246333195-bf5f795508dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }, // Wheat
    { id: 3, image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }, // Farm
];

export const BestOffers = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Best Offers</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {offers.map((offer) => (
                    <TouchableOpacity key={offer.id} style={styles.card}>
                        <Image source={{ uri: offer.image }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 80, // Space for bottom tab bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    viewAll: {
        fontSize: 14,
        color: '#2ECC71', // Green
        fontWeight: '500',
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 15,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
    },
});
