
import { View, StyleSheet, Image, useColorScheme, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from '@/constants/Colors';
import { NewWallpaper, Wallpaper } from "@/hooks/useWallpaper";

export interface FullWallpaper extends Wallpaper {
    liked: boolean;
    suggested: boolean;
    library: boolean;
}

export function ImageCard({ wallpaper, onPress }: {
    wallpaper: NewWallpaper,
    onPress?: () => void
}) {
    const theme = useColorScheme() ?? 'light';
    return <Pressable onPress={onPress}>
        <View>
            <Image source={{uri: wallpaper?.urls?.full}} style={styles.image} />
            <View style={styles.labelContainer}>
                <ThemedText className=" text-sm" style={styles.label}>{wallpaper.name}</ThemedText>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={'heart'}
                        size={18}
                        // color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                        color={wallpaper.liked ? 'red' : 'white'}   
                    />
                </View>
            </View>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        height: 220,
        borderRadius: 20
    },
    label: {
        color: "white"
    },
    labelContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0 , 0, 0.5)",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        
    }
})