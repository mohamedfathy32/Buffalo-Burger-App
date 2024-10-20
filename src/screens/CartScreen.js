import { View, Text } from 'react-native'
import React from 'react'

export default function CartScreen() {
  return (
    <View className='flex-1'>

      <View className='w-2/3 bg-orange-200 mx-auto p-4 rounded-xl'>
        <Text className='text-orange-500 font-bold text-center'>Your cart is empty</Text>
      </View>

    </View>
  )
}