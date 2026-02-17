import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SearchBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#FFFFFF" style={styles.icon} />
                <TextInput
                    placeholder="Search here..."
                    placeholderTextColor="#A0A0A0"
                    style={styles.input}
                />
                <Ionicons name="mic-outline" size={20} color="#FFFFFF" style={styles.icon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent background
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        marginHorizontal: 10,
    },
    icon: {
        opacity: 0.8,
    },
});
