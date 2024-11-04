import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../utils/context';
import Hr from '../components/Hr';
import CartCard from '../components/CartCard';

export default function CartScreen({ navigation }) {

  const { notifications, updateNotifications } = useContext(NotificationContext);
  const [productsArray, setProductsArray] = useState([]);
  var subTotal = 0;

  const getData = async () => {
    const productsStorage = await AsyncStorage.getItem('userId') || [];
    const arr = productsStorage ? JSON.parse(productsStorage) : [];
    setProductsArray(arr);
    console.log(arr);
    // AsyncStorage.clear();
    // updateNotifications()
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className='flex-1'>

      {/* Header */}
      <View className='flex flex-row justify-end items-center mb-3 bg-white h-16'>
        <Text className='mx-4 text-xl font-bold'>Shopping Cart</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>
      {
        // If async storage is empty return 'Your cart is empty' message
        !notifications ?
          // 'Your cart is empty' Message
          <View className='w-2/3 bg-orange-200 mx-auto p-4 rounded-xl'>
            <Text className='text-orange-500 font-bold text-center'>Your cart is empty</Text>
          </View> :
          <>
            <ScrollView>

              <Text className='text-orange-600 font-bold text-lg px-4'>The Offers</Text>

              {/* Product Card */}

              {
                productsArray.map((p) => {
                  subTotal += (p.total || p.price);
                  return <CartCard key={p.id} product={p} />
                })
              }
              {/* <CartCard product={product} />
              <CartCard product={product} />
              <CartCard product={product} /> */}



            </ScrollView>

            {/* White Part / Pay Details */}
            <View className='h-2/5 bg-white flex'>

              <View className='flex flex-row justify-between'>
                <Text className='p-4 text-xl'>Sub Total</Text>
                <Text className='p-4 text-xl font-bold'>{subTotal} EGP</Text>
              </View>
              <View className='flex flex-row justify-between'>
                <Text className='p-4 text-xl'>Taxes</Text>
                <Text className='p-4 text-xl font-bold'>{subTotal*0.3} EGP</Text>
              </View>
              <Hr />
              <View className='flex flex-row justify-between'>
                <Text className='p-4 text-3xl font-bold'>The Total</Text>
                <Text className='p-4 text-3xl font-bold'>{subTotal*1.3} EGP</Text>
              </View>

              {/* Add Button */}
              <TouchableOpacity className='bg-stone-200 w-11/12 mx-auto my-1 p-3 rounded-xl flex flex-row justify-between'
                onPress={() => {
                  navigation.navigate('Menu');
                }}
              >

                <View className='flex flex-row '>
                  <Text className='w-full mx-auto text-orange-600 text-center font-bold text-lg uppercase'>
                    + Add More Items
                  </Text>
                </View>

              </TouchableOpacity>

              {/* Checkout Button */}
              <TouchableOpacity className='bg-orange-600 w-11/12 mx-auto my-1 p-3 rounded-xl flex flex-row justify-between'
                onPress={() => {
                }}
              >

                <View className='flex flex-row '>
                  <Text className='w-full mx-auto text-white text-center font-bold text-lg uppercase'>
                    Checkout
                  </Text>
                </View>

              </TouchableOpacity>

            </View>
          </>
      }
    </View>
  )
}