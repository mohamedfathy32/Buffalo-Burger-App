// CategorySection.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
import { productsList } from "../utils/data";

const CategorySection = ({ category , navigation}) => {
  return (
    <>
      <View className="m-5 flex flex-row">
        <Text className="font-bold text-orange-500 text-lg uppercase">
          {category}
        </Text>
      </View>
      {productsList.map((product) =>
        product.category === category ? (
          <TouchableOpacity
            key={product.title}
            onPress={() => {
              navigation.navigate("MealDetails", { product });
            }}
          >
            <ProductCard product={product} />
          </TouchableOpacity>
        ) : null
      )}
    </>
  );
};

export default CategorySection;
