import axios from "axios"; 

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  data: any;
  timestamp: number;
}

export const useUnsplace = async (page: number = 5, per_page: number = 30): Promise<any[]> => { 
    const cacheKey = `wallpapers_${page}_${per_page}`;
    
    // Check cache first
    const cached = cache.get(cacheKey) as CachedData | undefined;
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.data;
    }
    
    try {
      const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=wallpaper&client_id=jj7_cVJ56UftQgm8QYAFxXfJBqmMDgPBFI1zjqrGQxo`;
      const response = await axios.get(url, {
        timeout: 10000, // 10 second timeout
      });   
      
      const data = response.data.results;
      
      // Transform data to include smaller image URLs for better performance
      const transformedData = data.map((item: any) => ({
        ...item,
        name: item.alt_description || item.description || `Wallpaper ${item.id}`,
        liked: false,
        urls: {
          full: item.urls.full,
          regular: item.urls.regular,
          small: item.urls.small,
          thumb: item.urls.thumb,
        }
      }));
      
      // Cache the result
      cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now()
      });
      
      return transformedData;
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      return [];
    }
}
