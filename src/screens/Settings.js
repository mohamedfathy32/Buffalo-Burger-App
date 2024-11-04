import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Settings({ navigation }) {
  return (
    <ScrollView>

      <View className='flex-1'>

        <View className='flex flex-row justify-end bg-gray-200 p-2'>
          <Text className='mx-3 font-bold text-lg'>Account Details</Text>
        </View>

        <TouchableOpacity className='flex flex-row justify-between p-3' onPress={() => { navigation.navigate('Account'); }}>

          <MaterialIcons name='arrow-back' size={24} />
          <Text className='mx-3'>Account Info</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row justify-between p-3' onPress={() => { navigation.navigate('Password'); }}>

          <MaterialIcons name='arrow-back' size={24} />
          <Text className='mx-3'>Change Password</Text>
        </TouchableOpacity>

        {/* Preferences */}

        <View className='flex flex-row justify-end bg-gray-200 p-2'>
          <Text className='mx-3 font-bold text-lg'>Preferences</Text>
        </View>

        <TouchableOpacity className='flex flex-row justify-between p-3' onPress={() => { }}>

          <View className='flex flex-row justify-between'>
            <MaterialIcons name='arrow-back' size={24} />
            <Text className='mx-3'>English</Text>
          </View>

          <Text className='mx-3'>Language</Text>

        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row justify-between p-3' onPress={() => { }}>

          <MaterialIcons name='arrow-back' size={24} />
          <Text className='mx-3'>Terms And Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row justify-between p-3' onPress={() => { }}>

          <MaterialIcons name='arrow-back' size={24} />
          <Text className='mx-3'>Privacy Policy</Text>
        </TouchableOpacity>

        {/* App Version */}

        <View className='flex flex-row justify-between bg-gray-200 p-2'>
          <Text className='mx-3'>4.5.7</Text>
          <Text className='mx-3 font-bold text-lg'>App Version</Text>
        </View>

        <TouchableOpacity className='flex flex-row justify-end p-3' onPress={() => {  }}>
          <Text className='mx-3'>Log Out</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>

  )
}