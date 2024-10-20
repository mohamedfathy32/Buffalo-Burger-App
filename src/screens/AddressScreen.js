import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AddressScreen() {
  return (
    <View className='flex-1 flex justify-between'>
      <Text className='mx-auto'>There are no saved addresses</Text>
      <TouchableOpacity className='bg-orange-600 w-11/12 mx-auto my-6 p-3 rounded-xl'>
        <Text className='text-white text-center font-bold text-lg'>
          Add new address
        </Text>
      </TouchableOpacity>
    </View>
  )
}