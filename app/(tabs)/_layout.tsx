import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';  
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth, useUser } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  // const { isSignedIn } = useAuth()
  // const {user } =useUser()
  //  if (!isSignedIn || !user) {
  //     return <Redirect href={'/(auth)/sign-up'} />
  //   }
    // console.log(user?.firstName, user?.lastName , user?.emailAddresses[0].emailAddress)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, 
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            bottom: 3,
            TabBarBackground: 'transparent',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color}/>,
        }}
      />
    </Tabs>
  );
}
