import { View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'


export default function AddressScreen({navigation}) {
  return (
    <View className='flex-1 flex justify-between'>

      {/* Header */}
      <View className='flex flex-row justify-end items-center my-3 '>
        <Text className='mx-4 text-xl font-bold'>Saved Addresses</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>

      <Text className='mx-auto'>There are no saved addresses</Text>
      <TouchableOpacity className='bg-orange-600 w-11/12 mx-auto my-6 p-3 rounded-xl'>
        <Text className='text-white text-center font-bold text-lg'>
          Add new address
        </Text>
      </TouchableOpacity>
    </View>
  )
}