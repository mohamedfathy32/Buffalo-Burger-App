import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from '../components/ProductCard'
import Offers from '../components/Offers'
import { productsList } from '../utils/data'

export default function MenuScreen() {
  return (
    <ScrollView>

      <View className='m-5 flex flex-row'>
        <Text className='font-bold text-orange-500 text-lg uppercase'>Hot offers</Text>
      </View>

      <Offers />

      <View className='m-5 flex flex-row'>
        <Text className='font-bold text-orange-500 text-lg uppercase'>burger sandwiches</Text>
      </View>

      {productsList.map((product) => <ProductCard key={product.title.en} product={product}/>)}

    </ScrollView>
  )
}