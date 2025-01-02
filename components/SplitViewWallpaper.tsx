import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from './ThemedView'
import { Wallpaper } from '@/hooks/useWallpaper';
import { ImageCard } from './ImageCard';
import DownloadPicture from './BottomSheet';

const SplitViewWallpaper = ({wallpapers, onScroll}: {
    wallpapers: Wallpaper[];
    onScroll?: (yOffset: number) => void;
}) =>{
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)
   
  return (
   <>
    <View className=' flex w-full flex-warp gap-3  flex-row '>
    <FlatList
      data={wallpapers.filter((_,index)=>index%2 === 0 ).map((_ , index)=>[wallpapers[index],wallpapers[index+1]])}
      keyExtractor={item => item[0].name}
      renderItem={({item: [first, second]}) => <ThemedView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
          <View style={styles.imageContainer}><ImageCard onPress={() => {
              setSelectedWallpaper(first)
          }} wallpaper={first} /></View>
      </ThemedView>
      <ThemedView style={styles.innerContainer}>
          {second && <View style={styles.imageContainer}><ImageCard wallpaper={second} onPress={() => {
              setSelectedWallpaper(second)
          }} /></View>}
      </ThemedView>
  </ThemedView> 
  }
    /> 
      </View>
      {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
    </>

  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 10
    },
    imageContainer: {
        paddingVertical: 10
    }
})
export default SplitViewWallpaper