import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { ThemedView } from './ThemedView'
import { NewWallpaper, Wallpaper } from '@/hooks/useWallpaper';
import { FullWallpaper, ImageCard } from './ImageCard';
import DownloadPicture from './BottomSheet';

const SplitViewWallpaper = ({wallpapers, onScroll ,setSelectedWallpaper}: {
    wallpapers: NewWallpaper[];
    onScroll?: (yOffset: number) => void;
    setSelectedWallpaper: (wallpaper: NewWallpaper) => void;
}) =>{
    
  // Memoize the data transformation for better performance
  const pairedData = useMemo(() => {
    return wallpapers
      .filter((_, index) => index % 2 === 0)
      .map((_, index) => [wallpapers[index * 2], wallpapers[index * 2 + 1]] as [NewWallpaper, NewWallpaper | undefined])
      .filter(item => item[0]);
  }, [wallpapers]);

  // Memoize render function
  const renderItem = useCallback(({item: [first, second]}: {item: [NewWallpaper, NewWallpaper | undefined]}) => (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <ImageCard 
            onPress={() => setSelectedWallpaper(first)} 
            wallpaper={first} 
          />
        </View>
      </ThemedView>
      <ThemedView style={styles.innerContainer}>
        {second && (
          <View style={styles.imageContainer}>
            <ImageCard 
              wallpaper={second} 
              onPress={() => setSelectedWallpaper(second)} 
            />
          </View>
        )}
      </ThemedView>
    </ThemedView>
  ), [setSelectedWallpaper]);

  const keyExtractor = useCallback((item: [NewWallpaper, NewWallpaper | undefined], index: number) => {
    const firstItem = item[0];
    if (firstItem && typeof firstItem === 'object') {
      return firstItem.id || firstItem.name || `split-view-${index}`;
    }
    return `split-view-${index}`;
  }, []);

  return (
   <> 
   <FlatList  
      data={pairedData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={4}
      updateCellsBatchingPeriod={50}
      initialNumToRender={6}
      windowSize={10}
      getItemLayout={(data, index) => ({
        length: 240, // approximate height of each item
        offset: 240 * index,
        index,
      })}
      // Enable better scrolling performance
      scrollEventThrottle={16}
      onScroll={onScroll ? (event) => {
        onScroll(event.nativeEvent.contentOffset.y);
      } : undefined}
    /> 
    </>

  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        position: 'relative'
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
 