import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import ProductCard from '../components/ProductCard'
import Offers from '../components/Offers'
import { productsList } from '../utils/data'

export default function MenuScreen({ navigation }) {
  return (
    <ScrollView>

      {/* Header */}


      <View className='m-5 flex flex-row'>
        <Text className='font-bold text-orange-500 text-lg uppercase'>Hot offers</Text>
      </View>

      <Offers />

      <View className='m-5 flex flex-row'>
        <Text className='font-bold text-orange-500 text-lg uppercase'>burger sandwiches</Text>
      </View>

      {productsList.map((product) => <TouchableOpacity
        key={product.title.en}
        onPress={() => { navigation.navigate('MealDetails',{product}); }}
      >
        <ProductCard product={product} />
      </TouchableOpacity>
      )}

    </ScrollView>
  )
}