import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../utils/CartContext";
import { fetchData } from "../utils/firebase";
import Offers from "../components/Offers";
import ProductCard from "../components/ProductCardMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./Splash";

export default function MenuScreen({ navigation }) {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      setCategories(await fetchData('categories'))
      setProducts(await fetchData('products'))
      setLoading(false);
    })()
  }, [])

  const addToCart = async (product) => {
    try {
      const productsStorage = await AsyncStorage.getItem('cart');
      let productsArray = productsStorage ? JSON.parse(productsStorage) : [];

      productsArray.push({
        id: Date.now(),
        image: product.image,
        title: product.title?.en,
        total: product.price,
        quantity: 1,
        description: product.description?.en,
      });

      await AsyncStorage.setItem('cart', JSON.stringify(productsArray));
      alert('Added To Cart !');
      updateCart();
    } catch (e) {
      console.warn(e);
    }
  };
  if (loading) {
    return <SplashScreen/>;
  }
  return (
    <ScrollView>
      {categories.map(cat =>
        <View key={cat.title?.en}>
          <Text className="m-5 flex flex-row font-bold text-orange-500 text-lg uppercase">{cat.title?.en}</Text>
          {cat.title?.en === 'offers' ? <Offers /> : products.map(product =>
            product.category === cat.title?.en &&
            <TouchableOpacity
              key={product.title?.en}
              onPress={() => { product.details ? navigation.navigate('MealDetails', { product }) : addToCart(product) }}>
              <ProductCard product={product} />
            </TouchableOpacity>
          )
          }
        </View>
      )}
    </ScrollView>
  );
}