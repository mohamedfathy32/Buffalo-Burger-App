// CategorySection.js
import React from 'react';
import { View, Text } from 'react-native';
import ProductCard from './ProductCard';
import { productsList } from '../utils/data';

const CategorySection = ({ category}) => {
  return (
    <>
      <View className="m-5 flex flex-row">
        <Text className="font-bold text-orange-500 text-lg uppercase">
          {category}
        </Text>
      </View>
      {productsList.map((product) =>
        product.category === category ? (
          <ProductCard key={product.title.en} product={product} />
        ) : null
      )}
    </>
  );
};

export default CategorySection;
