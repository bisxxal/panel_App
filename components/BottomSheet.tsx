import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, useColorScheme, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpaper';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';


const DownloadPicture = ({wallpaper ,onClose}:{wallpaper:any , onClose:()=>void}) => { 
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  const theme = useColorScheme() ?? 'light';
  
  return ( 
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['95%']}
        onClose={onClose}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ height:0 , display: 'none' }} 
        handleStyle={{ display: 'none' }}
      >
        <BottomSheetView className=' bg-red-200 relative flex-1' >
          <LinearGradient colors={['black', 'transparent']} className='absolute z-20  w-full h-20 '>
            <Image className=' relative rounded-t-3xl h-[500px] w-full ' source={{uri:wallpaper?.urls?.full}}/>
          </LinearGradient>

          <TouchableOpacity className='w-full z-20 flex flex-row justify-between p-5 absolute'>
              <Ionicons
                name={'close'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                onPress={onClose}
            />
             
             <View className=' flex flex-row gap-5'>
             <Ionicons
                name={'share'}
                size={20}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
               />
             <Ionicons
                name={'heart'}
                size={20}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            />
             </View>
          </TouchableOpacity>
          <ScrollView className=' bg-zinc-800 flex  absolute bottom-1 h-96 w-full flex1'>
          <DownloadButton url={wallpaper?.urls?.full} />  


            <View className=' flex flex-row items-center gap-3 p-5'> 
              <Image className='mt- w-12 h-12 rounded-full' source={{uri:wallpaper?.user?.profile_image?.small}}/>
              <Text className='text-white font-semibold ' >{wallpaper.user.name}</Text>
            </View>
 
          </ScrollView>
        </BottomSheetView>
      </BottomSheet> 
  );
};
function DownloadButton({ url }: { url: string }) {
  const theme = useColorScheme() ?? 'light';
  return <TouchableOpacity className=' flex flex-row items-center py-6 rounded-xl w-5/6 mx-auto ml-10 justify-center bg-black' onPress={async () => {
    let date = new Date().getTime();
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    
    try {
        await FileSystem.downloadAsync(url, fileUri)
        const response = await MediaLibrary.requestPermissionsAsync(true)
        if (response.granted) {
          MediaLibrary.createAssetAsync(fileUri)
          alert("Image saved")
        } else {
        }
    } catch (err) {
        console.log("FS Err: ", err)
    }
  }}  >
    <Ionicons
      name={'download'}
      size={24}
      color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
      style={{paddingRight: 4}}
    />
    <Text className=' text-center' style={{
      fontSize: 20,
      color: "white",
      fontWeight: "600",
    }}>Download</Text>
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  
  contentContainer: { 
    width: '100%',
    paddingTop: 0,
    alignItems: 'center', 
  },
});

export default DownloadPicture;