export interface Wallpaper {
    url: string;
    name: string;
}

interface FullWallpaper extends Wallpaper {
    liked: boolean;
    suggested: boolean;
    library: boolean;
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.suggested);
}

export function useLikedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.liked);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.library);
}
export const userimg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'

export function useWallpapers(): FullWallpaper[] {
    return [{
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/grtS8AsZRGyLm3VJ2SHS7g",
        "name": "Heritage",
        liked: true,
        suggested: true,
        library: false
    }, {
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/0reS7n7eRfClLKHIEiWJUw",
        "name": "Late night",
        liked: true,
        suggested: false,
        library: true
    },
    {
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/O0l3cIsdSJm7CRjGqrb5-Q",
        "name": "Motivation",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/6n67jVOxTRW0-xEqMpLw9A",
        name: "Night sky",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/IfLz4vd4Tfy5fnBlMN0cLA",
        name: "Sunrise",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://ideogram.ai/assets/progressive-image/balanced/response/Hma-KogESI-h9o8oyO1YKg",
        name: "Shoes",
        liked: false,
        suggested: true,
        library: false
    }]
}


export function useCarousel(): {title: string, image: string;}[] {
    return [{image: "https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "In the Sunset"}, {title: "Close to me", image: "https://ideogram.ai/assets/progressive-image/balanced/response/xPCpOvQYSVqIjuo2mjBPmg"}, {image: "https://ideogram.ai/assets/progressive-image/balanced/response/CNhPzxJ1RO2hO8RXF4dang", title: "In here"}]
}