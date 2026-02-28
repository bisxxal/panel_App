
import { View, StyleSheet, Image, useColorScheme, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from '@/constants/Colors';
import { NewWallpaper, Wallpaper } from "@/hooks/useWallpaper";
import { useState } from "react";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Use thumbnail/small size for list view performance
    const imageUrl = wallpaper?.urls?.small || wallpaper?.urls?.regular || wallpaper?.urls?.full;
    
    return <Pressable onPress={onPress}>
        <View>
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: imageUrl}} 
                    style={styles.image}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setError(true);
                        setLoading(false);
                    }}
                    // Performance optimizations
                    resizeMode="cover"
                    fadeDuration={200}
                />
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#ff6a00" />
                    </View>
                )}
                {error && (
                    <View style={styles.errorContainer}>
                        <Ionicons name="image-outline" size={40} color="#666" />
                    </View>
                )}
            </View>
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
    imageContainer: {
        position: 'relative',
        height: 220,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        height: 220,
        borderRadius: 20
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    errorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
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