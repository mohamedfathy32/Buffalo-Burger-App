import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from '../components/ProductCard'

export default function MenuScreen() {
  return (
    <ScrollView>

      <View>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </View>
    </ScrollView>
  )
}