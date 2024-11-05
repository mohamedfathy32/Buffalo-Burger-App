import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ReviewScreen({ navigation }) {
  return (
    <View className='flex-1'>

      {/* Header */}
      <View className='flex flex-row justify-end items-center my-3 '>
        <Text className='mx-4 text-xl font-bold'>Review</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>

      <Text>ReviewScreen</Text>
    </View>
  )
}