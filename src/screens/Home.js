import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { fetchData } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../utils/CartContext";
import Offers from "../components/Offers";
import MainProductCard from "../components/ProductCardMain";
import TechnicalSupport from "../components/TechnicalSupport";

export default function HomeScreen({ navigation }) {
  const { updateCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [topSellings, setTopSellings] = useState([])

  useEffect(() => {
    (async () => {
      setProducts(await fetchData('products'))
      setTopSellings(await fetchData('topSellings'))
    })()
  }, [])

  const addToCart = async (product) => {
    try {
      const productsStorage = await AsyncStorage.getItem('cart');
      let productsArray = productsStorage ? JSON.parse(productsStorage) : [];

      productsArray.push({
        id: Date.now(),
        image: product.image,
        title: product.title.en,
        quantity: 1,
        price: product.price,
        total: product.price,
      });

      await AsyncStorage.setItem('cart', JSON.stringify(productsArray));
      alert('Added To Cart !');
      updateCart();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1">
        <View className="m-5 flex flex-row">
          <Text className="font-bold text-orange-500 text-lg uppercase">
            Hot offers
          </Text>
        </View>

        <Offers />

        {/* Products */}
        <View className="m-5 flex flex-row">
          <Text className="font-bold text-orange-500 text-lg uppercase">
            Featured
          </Text>
        </View>
        {products?.map(product =>
          topSellings?.map(top => top.title.en === product.title.en &&
            <TouchableOpacity onPress={() => {
              product.details ? navigation.navigate('MealDetails', { product }) : addToCart(product)
            }}>
              <MainProductCard key={product.title.en} product={product} />
            </TouchableOpacity>
          )
        )}

        <TechnicalSupport />
      </View>
    </ScrollView>
  );
}
