import { SignedIn, SignedOut } from '@clerk/clerk-expo'; 
import {   Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';   
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import { useLibraryWallpapers, useLikedWallpapers, userimg, useSuggestedWallpapers, useWallpapers } from '@/hooks/useWallpaper'; 
import { ThemedView } from '@/components/ThemedView';
import SplitViewWallpaper from '@/components/SplitViewWallpaper';

const Tab = createMaterialTopTabNavigator();


export default function HomeScreen() {
  // const headerimg = 'https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return ( 
  <SafeAreaView className=' bg-transparent flex-1'>
  <ThemedView className='flex-1 pt-4'>

  <View className='flex items-center justify-center w-full p-4 h-40 bg-gray-900'>
      <Image className=' h-20 w-20 rounded-full' source={{uri: userimg}} />
  </View>
   <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#ff6a00',
      tabBarStyle: { backgroundColor: 'black' },
    }}
    >
    <Tab.Screen name="Suggested" component={Suggested} />
    <Tab.Screen name="Liked" component={Liked} />
    <Tab.Screen name="Library" component={Library} />
  </Tab.Navigator>
    
  </ThemedView>
  </SafeAreaView>

  );
}

const Suggested = () => { 
  const wallpapers = useSuggestedWallpapers();
  return (
    <ThemedView   className=' flex-1'>
      <SplitViewWallpaper wallpapers={wallpapers} />
    </ThemedView>
  );
}
const Library = () => { 
  const wallpapers = useLibraryWallpapers();
  return (
    <ThemedView   className=' flex-1'>
      <SplitViewWallpaper wallpapers={wallpapers} />
    </ThemedView>
  );
}
const Liked = () => { 
  const wallpapers = useLikedWallpapers();
  return (
    <ThemedView  className=' flex-1' >
      <SplitViewWallpaper wallpapers={wallpapers} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});