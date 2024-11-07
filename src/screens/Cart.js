import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../utils/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, getUserInfoById } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function CartScreen({ navigation }) {
  const { cart, updateCart } = useContext(CartContext);
  const [productsArray, setProductsArray] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [quantity, setQuantity] = useState(1); // added quantity state for tracking individual product quantity

  useEffect(() => {
    (async () => {
      const productsStorage = await AsyncStorage.getItem('cart');
      const arr = productsStorage ? JSON.parse(productsStorage) : [];
      setProductsArray(arr);
      const total = arr.reduce((sum, product) => sum + (product.total || product.price) * product.quantity, 0);
      setSubTotal(total);
    })();
  }, [productsArray]);

  const removeItem = async (productId) => {
    const updatedCart = productsArray.filter(prd => prd.id !== productId);
    setProductsArray(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
  };

  const modifyItem = async (productId, newQuantity) => {
    const updatedCart = productsArray.map(prd =>
      prd.id === productId ? { ...prd, quantity: newQuantity } : prd
    );
    setProductsArray(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
  };

  const handleCheckout = async () => {
    const userID = await AsyncStorage.getItem('userId');
    if (!userID) alert('please log in first');

    const userInfo = await getUserInfoById(userID);
    if (userInfo) {
      const date = new Date().toLocaleString('en-US', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });

      try {
        await setDoc(doc(db, "orders", `${userInfo.email} ${date.split('/').join('-')}`), {
          date,
          id: Date.now(),
          cart: productsArray,
          userID,
          totalPrice: subTotal
        });
        alert("Cart successfully checked out!");
        await AsyncStorage.removeItem("cart");
        updateCart()
        setProductsArray([])
      } catch (error) {
        console.error("Error checking out: ", error);
      }
    }
  };

  return (
    <View className='flex-1'>
      <View className='flex flex-row justify-between items-center mb-3 bg-white h-16'>
        <Text className='mx-4 text-xl font-bold'>Shopping Cart</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>

      {productsArray.length === 0 ? (
        <View className='w-2/3 bg-orange-200 mx-auto p-4 rounded-xl'>
          <Text className='text-orange-500 font-bold text-center'>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <Text className='text-[#ff5f00] font-bold text-lg px-4'>The Offers</Text>
            {productsArray.map((p) => (
              <View key={p.id} className='h-auto bg-white w-11/12 mx-auto my-2 rounded-2xl'>
                <View className='flex flex-row justify-between'>
                  <View className='flex flex-row w-4/5 my-3'>
                    <Image source={{ uri: p.image }} className="w-1/2 h-auto" resizeMode="contain" />
                    <View className='flex'>
                      <Text className='text-lg font-bold capitalize'>{p.title}</Text>
                      <Text>{p.total} EGP</Text>
                      <View className='flex flex-row justify-around items-center my-1 w-3/4'>
                        <TouchableOpacity
                          onPress={() => {
                            const newQuantity = p.quantity - 1;
                            newQuantity === 0 ? removeItem(p.id) : modifyItem(p.id, newQuantity);
                          }}
                          className='bg-white p-1 rounded-full border-2 border-[#ff5f00]'
                        >
                          <MaterialIcons name='remove' size={20} color={'#f97316'} />
                        </TouchableOpacity>
                        <Text className='w-1/3 text-center'>{p.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => { modifyItem(p.id, p.quantity + 1); }}
                          className='bg-[#ff5f00] p-1 border-2 border-transparent rounded-full'
                        >
                          <MaterialIcons name='add' size={20} color={'white'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    className='mx-6'
                    onPress={() => { setReveal(prev => !prev); }}
                  >
                    <MaterialIcons name={reveal ? `arrow-drop-up` : `arrow-drop-down`} size={60} />
                  </TouchableOpacity>
                </View>
                {reveal && <Text className='p-3 text-stone-400'>{p.description}</Text>}
              </View>
            ))}
          </ScrollView>

          <View className='h-2/5 bg-white flex'>
            <View className='flex flex-row justify-between'>
              <Text className='p-4 text-xl'>Sub Total</Text>
              <Text className='p-4 text-xl font-bold'>{(subTotal - subTotal * 0.14).toFixed(2)} EGP</Text>
            </View>
            <View className='flex flex-row justify-between'>
              <Text className='p-4 text-xl'>VAT</Text>
              <Text className='p-4 text-xl font-bold'>{(subTotal * 0.14).toFixed(2)} EGP</Text>
            </View>
            <View className=' border-t border-t-gray-300' />
            <View className='flex flex-row justify-between'>
              <Text className='p-4 text-3xl font-bold'>The Total</Text>
              <Text className='p-4 text-3xl font-bold'>{(subTotal).toFixed(2)} EGP</Text>
            </View>
            <TouchableOpacity
              className='bg-stone-200 w-11/12 mx-auto my-1 p-3 rounded-xl flex flex-row justify-between'
              onPress={() => { navigation.navigate('Menu'); }}
            >
              <Text className='w-full mx-auto text-[#ff5f00] text-center font-bold text-lg uppercase'>
                + Add More Items
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-[#ff5f00] w-11/12 mx-auto my-1 p-3 rounded-xl flex flex-row justify-between'
              onPress={handleCheckout}
            >
              <Text className='w-full mx-auto text-white text-center font-bold text-lg uppercase'>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
