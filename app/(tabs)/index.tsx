import { SignedIn, SignedOut } from '@clerk/clerk-expo'; 
import {   Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';   
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import { FullWallpaper, NewWallpaper, useLibraryWallpapers, useLikedWallpapers, userimg, useSuggestedWallpapers, useWallpapers, Wallpaper } from '@/hooks/useWallpaper'; 
import { ThemedView } from '@/components/ThemedView';
import SplitViewWallpaper from '@/components/SplitViewWallpaper';
import { useEffect, useState } from 'react';
import DownloadPicture from '@/components/BottomSheet';
import { Link } from 'expo-router'; 
import axios from 'axios';
import { useUnsplace } from '@/hooks/useUnsplase';

const Tab = createMaterialTopTabNavigator();
 

export default function HomeScreen() {
  
  return ( 
  <SafeAreaView className=' bg-transparent flex-1'>
  <ThemedView className='flex-1 pt-4'>

  <View className='flex items-center justify-center w-full p-4 h-40 bg-[#212121]'>
    <Link href="/(tabs)/account">
      <Image className=' h-20 w-20 rounded-full' source={{uri: userimg}} />
      </Link>
  </View>
   <Tab.Navigator
    screenOptions={{
      // tabBarActiveTintColor: '#ff6a00',
      tabBarStyle: { backgroundColor: '#212121' },
      tabBarIndicatorStyle:{
        backgroundColor: '#ff6a00',
        height: 5,
      },
      tabBarLabelStyle: { fontSize: 16 , fontWeight: 'bold'},
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
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)
  const wallpapers = useSuggestedWallpapers();

  const [img, setImg] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      setImg(await useUnsplace())
    }
    fetchApi() 
    
  }, [])

  return (
    <ThemedView   className=' flex-1'>
      
      <SplitViewWallpaper setSelectedWallpaper={setSelectedWallpaper}   wallpapers={img} />
      {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
    </ThemedView>
  );
}
const Library = () => { 
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)
  const wallpapers = useLibraryWallpapers();

  const [img, setImg] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      setImg(await useUnsplace())
    }
    fetchApi() 
    
  }, [])
  return (
    <ThemedView   className=' flex-1'>
      <SplitViewWallpaper setSelectedWallpaper={setSelectedWallpaper}   wallpapers={img} />
      {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
    </ThemedView>
  );
}
const Liked = () => { 
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)
  const wallpapers = useLikedWallpapers();

  const [img, setImg] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      setImg(await useUnsplace())
    }
    fetchApi() 
    
  }, [])

  return (
    <ThemedView  className=' flex-1' >
      <SplitViewWallpaper setSelectedWallpaper={setSelectedWallpaper}   wallpapers={img} />
      {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
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