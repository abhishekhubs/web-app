import { View, Text, StyleSheet } from 'react-native';

export default function FarmsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>All Farms Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
