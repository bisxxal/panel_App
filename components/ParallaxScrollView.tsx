// import React, { PropsWithChildren, ReactElement } from 'react';
// import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
// import Animated, {
//   interpolate,
//   useAnimatedRef,
//   useAnimatedStyle,
//   useScrollViewOffset,
// } from 'react-native-reanimated';

// import { ThemedView } from '@/components/ThemedView'; 
// import { useColorScheme } from '@/hooks/useColorScheme';
// import Carousel from 'react-native-reanimated-carousel';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useCarousel } from '@/hooks/useWallpaper';

// const HEADER_HEIGHT = 250;

// type Props = PropsWithChildren<{ 
//   headerBackgroundColor: { dark: string; light: string };
// }>;

// export default function ParallaxScrollView({
//   children, 
//   headerBackgroundColor,
// }: Props) {
//   const colorScheme = useColorScheme() ?? 'light';
//   const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   const scrollOffset = useScrollViewOffset(scrollRef); 
//   const headerAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             scrollOffset.value,
//             [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
//             [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
//           ),
//         },
//         {
//           scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
//         },
//       ],
//     };
//   });
//   const carouselItems = useCarousel();

//   const width = Dimensions.get('window').width;
//   return (
//     <ThemedView style={styles.container}>
//       <Animated.ScrollView
//         ref={scrollRef}
//         scrollEventThrottle={16} >
//         <Animated.View
//           style={[
//             styles.header,
//             { backgroundColor: headerBackgroundColor[colorScheme] },
//             headerAnimatedStyle,
//           ]}> 
//           <Carousel
//           width={width}
//           data={carouselItems} 
//           renderItem={({ index }) => (
//             <>
//               <View
//                 style={{
//                     flex: 1,
//                     borderWidth: 1,
//                     justifyContent: 'center',
//                 }}
//               >
//                 <Image source={{uri: carouselItems[index].image}} style={{height: HEADER_HEIGHT}} />
//               </View>

//               <LinearGradient colors={['transparent', 'black']} style={{flex: 1, position: "absolute", zIndex: 10, height: HEADER_HEIGHT / 2, width: "100%", bottom: 0}}>
//                 <Animated.View>
//                   <Text style={[{color: "white", paddingTop: HEADER_HEIGHT / 3, textAlign: "center", fontSize: 30, fontWeight: "600"}]}>{carouselItems[index].title}</Text>
//                 </Animated.View>
//               </LinearGradient>
//             </>
//           )}
//         />

//         </Animated.View>
//         <ThemedView style={styles.content}>{children}</ThemedView>
//       </Animated.ScrollView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
    
//   },
//   header: {
//     height: HEADER_HEIGHT,
//     overflow: 'hidden', 

//   },
//   content: {
//     flex: 1,
//     padding: 3,
//     marginTop:5,
//     gap: 16,
//     overflow: 'hidden',  
//   },
// });


import React, { PropsWithChildren } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,configureReanimatedLogger , ReanimatedLogLevel
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView'; 
import { useColorScheme } from '@/hooks/useColorScheme';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useCarousel } from '@/hooks/useWallpaper';

  
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true,  
});


const HEADER_HEIGHT = 150;


type Props = PropsWithChildren<{ 
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children, 
  headerBackgroundColor,
}: Props) {
  
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef:any = useAnimatedRef<FlatList>();   
  const scrollOffset = useScrollViewOffset(scrollRef); 

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const carouselItems = useCarousel();
  const width = Dimensions.get('window').width;

  // Wrapper for the carousel item
  const renderCarouselItem = ({ index }: { index: number }) => {
    const item = carouselItems[index];

    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.image }} style={styles.carouselImage} />
        <LinearGradient 
          colors={['transparent', 'black']} 
          style={styles.gradientOverlay}
        >
          <Text style={styles.carouselText}>{item.title}</Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={scrollRef}   
        ListHeaderComponent={() => (
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            <Carousel
              width={width}
              data={carouselItems}
              renderItem={renderCarouselItem}
            />
          </Animated.View>
        )}
        ListFooterComponent={<>{children}</>}  
        data={[]}
        renderItem={null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT*2,
    overflow: 'hidden', 
  },
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    height: HEADER_HEIGHT*2,
  },
  gradientOverlay: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
    height: HEADER_HEIGHT / 2,
    width: '100%',
    bottom: -1,
  },
  carouselText: { 
    color: 'white',
    paddingTop: HEADER_HEIGHT /6,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
});
