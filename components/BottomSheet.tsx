import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, useColorScheme, TouchableOpacity, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpaper';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';


const DownloadPicture = ({wallpaper ,onClose}:{wallpaper:Wallpaper , onClose:()=>void}) => { 
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  const theme = useColorScheme() ?? 'light';
  
  return ( 
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['99%']}
        onClose={onClose}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ height:0 , display: 'none' }} 
        handleStyle={{ display: 'none' }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Image className=' relative rounded-t-3xl h-[60%] w-full ' source={{uri:wallpaper.url}}/>

          <TouchableOpacity className='w-full flex flex-row justify-between p-5 absolute'>
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
          <ThemedView  >
            <ThemedText  >{wallpaper.name}</ThemedText>
          </ThemedView>
          <DownloadButton url={wallpaper.url} />  
        </BottomSheetView>
      </BottomSheet> 
  );
};
function DownloadButton({ url }: { url: string }) {
  const theme = useColorScheme() ?? 'light';
  return <Pressable onPress={async () => {
    let date = new Date().getTime();
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    
    try {
        await FileSystem.downloadAsync(url, fileUri)
        const response = await MediaLibrary.requestPermissionsAsync(true)
        if (response.granted) {
          MediaLibrary.createAssetAsync(fileUri)
          alert("Image saved")
        } else {
          console.error("permission not granted")
        }
    } catch (err) {
        console.log("FS Err: ", err)
    }
  }} style={{
    backgroundColor: "black",
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme === 'light' ? Colors.light.text : Colors.dark.icon,
  }}>
    <Ionicons
      name={'download'}
      size={24}
      color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
      style={{paddingRight: 4}}
    />
    <Text style={{
      fontSize: 20,
      color: "white",
      fontWeight: "600",
    }}>Download</Text>
  </Pressable>
}
const styles = StyleSheet.create({
  
  contentContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 0,
    alignItems: 'center', 
  },
});

export default DownloadPicture;