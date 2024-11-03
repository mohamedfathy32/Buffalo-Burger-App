import { View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {

  const printLocal = async () => {
    const arr = await AsyncStorage.getItem('userId') || [];
    console.log(arr);

  };

  useEffect(() => {
    printLocal();
  }, []);

  return (
    <View className='flex-1'>

      <View className='flex flex-row justify-end items-center my-3 '>
        <Text className='mx-4 text-xl font-bold'>Shopping Cart</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>

      <View className='w-2/3 bg-orange-200 mx-auto p-4 rounded-xl'>
        <Text className='text-orange-500 font-bold text-center'>Your cart is empty</Text>
      </View>

    </View>
  )
}