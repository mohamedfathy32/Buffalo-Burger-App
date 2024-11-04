// CategorySection.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
import { fetchData } from "../utils/firebase";

const CategorySection = ({ category, navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data);
      // console.log(data);
    };

    getProducts();
  }, []);

  return (
    <>
      <View className="m-5 flex flex-row">
        <Text className="font-bold text-orange-500 text-lg uppercase">
          {category}
        </Text>
      </View>
      {products.map((product) =>
        product.category === category ? (
          <TouchableOpacity
            key={product.title.en}
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
