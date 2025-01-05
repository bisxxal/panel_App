import axios from "axios"; 
export const useUnsplace = async () => { 
    const url = 'https://api.unsplash.com/search/photos?page=5&per_page=30&query=wallpaper&client_id=jj7_cVJ56UftQgm8QYAFxXfJBqmMDgPBFI1zjqrGQxo'
    const response = await axios(url);   
    const data = response.data
    return data.results 
}
