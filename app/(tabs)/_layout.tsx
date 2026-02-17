import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2ECC71', // Green for active
        tabBarInactiveTintColor: '#8E8E93', // Gray for inactive
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Use a transparent background on iOS to show the blur effect
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="farms"
        options={{
          title: 'All Farms',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="leaf" color={color} />, // Using leaf as proxy for tractor/farm
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistic',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="stats-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
      {/* Hide the explore route if we are not using it anymore, or delete the file. 
          For now, I'll just not include it in the Tabs, but I should probably hide or remove it.
          If I don't include it here, it won't show in the tab bar but might still be accessible if linked.
          But since it's a file-based router, if it's in the folder it's a route.
          To hide it from the tab bar, we can use href: null or just not list it if we map manually, 
          but Expo Router auto-discovers. 
          Actually, in Expo Router v3/v4+, if we define Tabs.Screen for specific names, only those show up?
          No, usually others might show up as "Explore" if not hidden.
          Let's explicitly hide it or just leave it for now. 
          Wait, I should check if I need to add explicit Tabs.Screen with href: null for explore to hide it.
      */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
