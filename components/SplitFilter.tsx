import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { ThemedView } from './ThemedView'
import { NewWallpaper, Wallpaper } from '@/hooks/useWallpaper';
import { FullWallpaper, ImageCard } from './ImageCard';

const SplitViewWallpaper = ({wallpapers, setSelectedWallpaper}: {
    wallpapers: NewWallpaper[]; 
    setSelectedWallpaper: (wallpaper: NewWallpaper) => void;
}) =>{
    
  // Memoize the data transformation for better performance
  const pairedData = useMemo(() => {
    return wallpapers
      .filter((_, index) => index % 4 === 0)
      .map((_, index) => [wallpapers[index * 4], wallpapers[index * 4 + 1]] as [NewWallpaper, NewWallpaper | undefined])
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
      return firstItem.id || firstItem.name || `split-filter-${index}`;
    }
    return `split-filter-${index}`;
  }, []);

  return (
   <> 
   <FlatList  
      data={pairedData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      updateCellsBatchingPeriod={50}
      initialNumToRender={4}
      windowSize={8}
      getItemLayout={(data, index) => ({
        length: 240, // approximate height of each item
        offset: 240 * index,
        index,
      })}
      scrollEventThrottle={16}
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

 