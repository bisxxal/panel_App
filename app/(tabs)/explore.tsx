import DownloadPicture from '@/components/BottomSheet';
import { ImageCard } from '@/components/ImageCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SplitViewWallpaper from '@/components/SplitViewWallpaper';
import { useCarousel, useWallpapers, Wallpaper } from '@/hooks/useWallpaper';
import { useState } from 'react';
import { StyleSheet, Image, Platform, Text, SafeAreaView, Button, View, FlatList, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
const TOPBAR_HEIGHT = 250;
export default function Explore() {
 
 const wallpapers = useWallpapers();
 const width = Dimensions.get('window').width;
 const [yOffset, setScrollY] = useState(0);
 const carouselItems = useCarousel ();

   const [show , setShow] = useState<null| Wallpaper>(null);

   const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(yOffset, [-TOPBAR_HEIGHT, 0, TOPBAR_HEIGHT], [1.5, 1, 1]),
        },
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(yOffset, [-TOPBAR_HEIGHT, TOPBAR_HEIGHT / 2, TOPBAR_HEIGHT], [1, 1, 0]),
    };
  });
 
  return <ThemedSafeAreaView style={{flex: 1}}>
  <Animated.View style={[{height: Math.max(0, TOPBAR_HEIGHT - yOffset)}, headerAnimatedStyle]}>
    <Carousel
      width={width}
      data={carouselItems}
      onSnapToItem={(index) => console.log('current index:', index)}
      renderItem={({ index }) => (
        <View className=' flex-1'>
          <View
            style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
            }}
          >
            <Image source={{uri: carouselItems[index].image}} style={{height: TOPBAR_HEIGHT}} />
          </View>

          <LinearGradient colors={['transparent', 'black']} style={{flex: 1, position: "absolute", zIndex: 10, height: TOPBAR_HEIGHT / 2, width: "100%", bottom: 0}}>
            <Animated.View style={textAnimatedStyle}>
              <Text style={[{color: "white", paddingTop: TOPBAR_HEIGHT / 3, textAlign: "center", fontSize: 30, fontWeight: "600"}]}>{carouselItems[index].title}</Text>
            </Animated.View>
          </LinearGradient>
        </View>
      )}
    />
  </Animated.View>
  <View style={{borderRadius: 20}}>
    <SplitViewWallpaper onScroll={(yOffset) => {
      setScrollY(yOffset)
    }} wallpapers={wallpapers} />
  </View>
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
