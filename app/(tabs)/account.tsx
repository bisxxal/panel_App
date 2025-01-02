import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { SignedIn } from '@clerk/clerk-expo'
import SignOutButton from '../(auth)/SignedOut'
import { SignedOut, SignUpButton } from '@clerk/clerk-react'
import { Link } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const Account = () => {
  return (
    <SafeAreaView className='text-white flex-1 bg-slate-800 p-2'>  
   <ScrollView>
    <Text className='text-white text- mt-10'>Panels</Text>
        
        <SignedIn>
            <Text>logout</Text>
            <SignOutButton />
        </SignedIn>

        <SignedOut>
            <Link className=' text-white w-full bg-gray-500 h-40 !flex items-center justify-center' href="/(auth)/sign-up">
            <View className='flex items-center flex-row gap-2 backdrop-blur-md border-2 border-[#ffffff27] px-12 rounded-3xl p-4 absolute bottom-24 '>
      <AntDesign name="google" size={21} color="white" />
        <Text  className=' text-white'>Sign in with Google</Text>
      </View>
            </Link>
            {/* <Text>This content is public. Only signed out users can see this.</Text> */}
        </SignedOut>

   </ScrollView>
    </SafeAreaView>
  )
}

export default Account