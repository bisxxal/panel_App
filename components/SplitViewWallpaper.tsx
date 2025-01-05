import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from './ThemedView'
import { NewWallpaper, Wallpaper } from '@/hooks/useWallpaper';
import { FullWallpaper, ImageCard } from './ImageCard';
import DownloadPicture from './BottomSheet';

const SplitViewWallpaper = ({wallpapers, onScroll ,setSelectedWallpaper}: {
    wallpapers: NewWallpaper[];
    onScroll?: (yOffset: number) => void;
    setSelectedWallpaper: (wallpaper: NewWallpaper) => void;
}) =>{
    
  return (
   <> 
   <FlatList  
      data={wallpapers.filter((_,index)=>index%2 === 0 ).map((_ , index)=>[wallpapers[index],wallpapers[index+1]])}
      keyExtractor={item => item[0].name}
      renderItem={({item: [first, second]}) => <ThemedView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <ImageCard onPress={() => {
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


// import { View, Text, FlatList, StyleSheet } from 'react-native'
// import React, { useState } from 'react'
// import { ThemedView } from './ThemedView'
// import { Wallpaper } from '@/hooks/useWallpaper';
// import { ImageCard } from './ImageCard';
// import DownloadPicture from './BottomSheet';

// const SplitViewWallpaper = ({wallpapers, onScroll}: {
//     wallpapers: Wallpaper[];
//     onScroll?: (yOffset: number) => void;
// }) => {
//     const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)

//     return (
//         <>
//             <FlatList  
//                 data={wallpapers.filter((_, index) => index % 2 === 0).map((_, index) => [wallpapers[index], wallpapers[index + 1]])}
//                 keyExtractor={item => item[0].name}
//                 renderItem={({ item: [first, second] }) => (
//                     <ThemedView style={styles.container}>
//                         <ThemedView style={styles.innerContainer}>
//                             <View style={styles.imageContainer}>
//                                 <ImageCard onPress={() => setSelectedWallpaper(first)} wallpaper={first} />
//                             </View>
//                         </ThemedView>
//                         <ThemedView style={styles.innerContainer}>
//                             {second && (
//                                 <View style={styles.imageContainer}>
//                                     <ImageCard wallpaper={second} onPress={() => setSelectedWallpaper(second)} />
//                                 </View>
//                             )}
//                         </ThemedView>
//                     </ThemedView>
//                 )}
//             />
//             {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         flex: 1
//     },
//     innerContainer: {
//         flex: 1,
//         padding: 10
//     },
//     imageContainer: {
//         paddingVertical: 10
//     }
// });

// export default SplitViewWallpaper;
