import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Header } from '@/components/home/Header';
import { SearchBar } from '@/components/home/SearchBar';
import { WeatherCard } from '@/components/home/WeatherCard';
import { InvestCategory } from '@/components/home/InvestCategory';
import { BestOffers } from '@/components/home/BestOffers';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Deep Green Gradient Background */}
      <LinearGradient
        colors={['#0F4C2C', '#1A5D3A', '#2C7A4F', '#F5F5F5']}
        locations={[0, 0.25, 0.45, 0.5]}
        style={styles.gradientBackground}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          <Header />
          <SearchBar />
          <WeatherCard />
          <InvestCategory />
          <BestOffers />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
});
