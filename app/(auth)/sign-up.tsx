import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Text, View, Button, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import AntDesign from '@expo/vector-icons/AntDesign';
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)', { scheme: 'myapp' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) { 
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View style={{ flex: 1, position:'relative' ,justifyContent: 'center', backgroundColor:'black' , alignItems: 'center' }}>  
      
      <Image className='flex-1 h-full w-full' source={{uri:'https://images.unsplash.com/photo-1500817487388-039e623edc21?q=80&w=2571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} />
        
        <TouchableOpacity className='absolute top-60 text-2xl'>
          <Text className=' font-bold '>Wellcome to panels</Text>
           </TouchableOpacity>

      <TouchableOpacity className='flex items-center flex-row gap-2 backdrop-blur-md border-2 border-[#ffffff27] px-12 rounded-3xl p-4 absolute bottom-24 ' onPress={onPress}>
      <AntDesign name="google" size={21} color="white" />
        <Text  className=' text-white'>Sign in with Google</Text>
      </TouchableOpacity>

      <Link className=' absolute bottom-10 ' href="/(tabs)">
        <Text className='text-lg text-white'>Skip for now</Text>
      </Link>

    </View>
  )
}