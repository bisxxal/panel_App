
import {   Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';   
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import { FullWallpaper, NewWallpaper, useLibraryWallpapers, useLikedWallpapers, userimg, useSuggestedWallpapers, useWallpapers, Wallpaper } from '@/hooks/useWallpaper'; 
import { ThemedView } from '@/components/ThemedView';
import SplitViewWallpaper from '@/components/SplitViewWallpaper';
import { useEffect, useState } from 'react';
import DownloadPicture from '@/components/BottomSheet';
import { Link } from 'expo-router'; 
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

    const [img, setImg] = useState<NewWallpaper[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await useUnsplace(5, 30) // Use optimized API call
                setImg(data)
            } catch (err) {
                setError('Failed to load wallpapers')
                console.error('Error loading wallpapers:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchApi() 
    }, [])

    if (loading) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-white text-lg'>Loading wallpapers...</Text>
            </ThemedView>
        )
    }

    if (error) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-red-500 text-lg'>{error}</Text>
            </ThemedView>
        )
    }

    return (
        <ThemedView className='flex-1'>
            <SplitViewWallpaper 
                setSelectedWallpaper={setSelectedWallpaper}   
                wallpapers={img} 
            />
            {selectedWallpaper && (
                <DownloadPicture 
                    wallpaper={selectedWallpaper} 
                    onClose={() => setSelectedWallpaper(null)} 
                />
            )}
        </ThemedView>
    );
}
const Library = () => { 
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)
    const wallpapers = useLibraryWallpapers();

    const [img, setImg] = useState<NewWallpaper[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await useUnsplace(3, 30) // Different page for variety
                setImg(data)
            } catch (err) {
                setError('Failed to load wallpapers')
                console.error('Error loading wallpapers:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchApi()
    }, [])

    if (loading) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-white text-lg'>Loading library...</Text>
            </ThemedView>
        )
    }

    if (error) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-red-500 text-lg'>{error}</Text>
            </ThemedView>
        )
    }

    return (
        <ThemedView className='flex-1'>
            <SplitViewWallpaper 
                setSelectedWallpaper={setSelectedWallpaper}   
                wallpapers={img} 
            />
            {selectedWallpaper && (
                <DownloadPicture 
                    wallpaper={selectedWallpaper} 
                    onClose={() => setSelectedWallpaper(null)} 
                />
            )}
        </ThemedView>
    );
}
const Liked = () => { 
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)
    const wallpapers = useLikedWallpapers();

    const [img, setImg] = useState<NewWallpaper[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await useUnsplace(7, 30) // Different page for variety
                setImg(data)
            } catch (err) {
                setError('Failed to load wallpapers')
                console.error('Error loading wallpapers:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchApi() 
    }, [])

    if (loading) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-white text-lg'>Loading liked wallpapers...</Text>
            </ThemedView>
        )
    }

    if (error) {
        return (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text className='text-red-500 text-lg'>{error}</Text>
            </ThemedView>
        )
    }

    return (
        <ThemedView className='flex-1'>
            <SplitViewWallpaper 
                setSelectedWallpaper={setSelectedWallpaper}   
                wallpapers={img} 
            />
            {selectedWallpaper && (
                <DownloadPicture 
                    wallpaper={selectedWallpaper} 
                    onClose={() => setSelectedWallpaper(null)} 
                />
            )}
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