import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  // Get current date and format it
  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello, <Text style={styles.greetingBold}>{getGreeting()}</Text></Text>
        <TouchableOpacity style={styles.dateContainer}>
          <Text style={styles.date}>{getCurrentDate()}</Text>
          <Ionicons name="chevron-down" size={16} color="#E0E0E0" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.emoji}>😊</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  greetingBold: {
    fontWeight: '700',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  date: {
    color: '#E0E0E0', // Light grey for secondary text
    fontSize: 14,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
});
