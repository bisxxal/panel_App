import DownloadPicture from '@/components/BottomSheet';
import { ImageCard } from '@/components/ImageCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SplitViewWallpaper from '@/components/SplitViewWallpaper';
import { NewWallpaper, useCarousel, useWallpapers, Wallpaper } from '@/hooks/useWallpaper';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Text, SafeAreaView, Button, View, FlatList, Dimensions } from 'react-native';
 
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { useUnsplace } from '@/hooks/useUnsplase';
 
export default function Explore() {
 
 const wallpapers = useWallpapers();
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | NewWallpaper>(null)

    const [img, setImg] = useState([])
      useEffect(() => {
        const fetchApi = async () => {
          setImg(await useUnsplace())
        }
        fetchApi() 
      }, []) 
  return <ThemedSafeAreaView style={{flex: 1}}>
 
  <ParallaxScrollView   headerBackgroundColor={{dark: 'black', light: 'white'}}>     
        <FlatList
        data={[]}
        keyExtractor={(item, index) => `key-${index}`}
        ListHeaderComponent={() => (
          <SplitViewWallpaper wallpapers={img} setSelectedWallpaper={setSelectedWallpaper}  />
        )}
        renderItem={null}
      />
    </ParallaxScrollView>
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
</ThemedSafeAreaView>

}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
 