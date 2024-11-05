// CategorySection.js
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
import { fetchData } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationContext } from "../utils/context";

const CategorySection = ({ category, navigation }) => {
  const [products, setProducts] = useState([]);
  const { updateNotifications } = useContext(NotificationContext);


  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData('products');
      setProducts(data);
      // console.log(data);
    };

    getProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const productsStorage = await AsyncStorage.getItem('cart');
      let productsArray = productsStorage ? JSON.parse(productsStorage) : [];

      productsArray.push({
        id: Date.now(),
        img: product.image,
        title: product.title.en,
        quantity: 1,
        price: product.price,
        total: product.price,
      });

      await AsyncStorage.setItem('cart', JSON.stringify(productsArray));
      alert('Added To Cart !');
      updateNotifications();
    } catch (e) {
      console.warn(e);
    }
  };

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
              product.details ? navigation.navigate('MealDetails', { product }) : addToCart(product)
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
