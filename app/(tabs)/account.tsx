import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SignedIn } from '@clerk/clerk-expo'
import SignOutButton from '../(auth)/SignedOut'
import { SignedOut, SignUpButton } from '@clerk/clerk-react'
import { Link, useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons' 

const Account = () => {
  const router = useRouter()
  return (
    <SafeAreaView className='text-white flex-1 relative  p-2'>   
    <Text className='text-white text-5xl px-5 font-bold mt-14'>Panels</Text>
        <SignedIn>
            <Text>logout</Text>
            <SignOutButton />
        </SignedIn>

        <SignedOut>
            <View className=' text-white rounded-2xl bg-zinc-800 mx-5 mt-10 w-[90%] h-40 flex items-center justify-center ' >
            <TouchableOpacity onPress={()=>router.push('/(auth)/sign-up')} className='flex items-center flex-row gap-2 border-2 border-[#ffffff27] px-12 rounded-2xl p-4'>
              <AntDesign name="google" size={21} color="white" />
                <Text  className=' text-white'>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
        </SignedOut>

        <View className=' mt-20 pl-4'>
            <Text className='text-center text-gray-500'>Pannels @2025 </Text>
            <Text className='text-center text-gray-500'>Pannel Wallpaper</Text>
        </View>

        <View className='text-white mt-10 absolute  bottom-20 px-7'>
            <Text className='text-white text-5xl font-bold'>About</Text>
            <Text className='text-white text-xl mt-5'>Account</Text>
            <Text className='text-white text-xl mt-5'>Privacy Policy</Text>
            <Text className='text-white text-xl mt-5'>term and condition</Text>
            <Text className='text-white text-xl mt-5'>Licence</Text>
            <Text className='text-white text-xl mt-5'>Version 1.13</Text>
            </View> 
    </SafeAreaView>
  )
}

export default Account