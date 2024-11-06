import { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartContext } from '../utils/CartContext';
import { fetchData } from '../utils/firebase';
import Swal from 'sweetalert2';

export default function MealDetails({ navigation, route }) {

  const { product } = route.params;
  const { updateCart } = useContext(CartContext);

  const [sizes, setSizes] = useState([]);
  const [breads, setBreads] = useState([]);
  const [comboOptions, setComboOptions] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [extras, setExtras] = useState([]);

  const [size, setSize] = useState('');
  const [bread, setBread] = useState('');
  const [comboOption, setComboOption] = useState('');
  const [drink, setDrink] = useState('');
  const [myExtras, setMyExtras] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      setSizes(product?.details?.size)
      setBreads(await fetchData('breads'))
      setComboOptions(await fetchData('comboOptions'))
      setDrinks(await fetchData('drinks'))
      setExtras(await fetchData('extras'))

      setSize(sizes[0].title.en)
      setBread(breads[0].title.en)
      setComboOption(comboOptions[0].title.en)
      setDrink(drinks[0].title.en)
    })()
  }, [])

  const calculateTotalPrice = () => {
    const selectedSize = sizes.find(s => s.title.en === size);
    const selectedBread = breads.find(b => b.title.en === bread);
    const selectedComboOption = comboOptions.find(c => c.title.en === comboOption);
    const selectedDrink = comboOption !== 'no combo' ? drinks.find(d => d.title.en === drink) : { price: 0 };
    const extrasTotal = myExtras.reduce((acc, me) => acc + (extras.find(e => e.title.en === me)?.price || 0), 0);
    return (selectedSize?.price || 0) + (selectedBread?.price || 0) + (selectedComboOption?.price || 0) + (selectedDrink?.price || 0) + extrasTotal;
  };

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [myExtras, drink, size, comboOption, bread]);

  const addToCart = async () => {
    try {
      const productsStorage = await AsyncStorage.getItem('cart');
      let productsArray = productsStorage ? JSON.parse(productsStorage) : [];

      productsArray.push({
        id: Date.now(),
        image: product.image,
        title: product.title.en,
        total: totalPrice,
        quantity: 1,
        description: product.description?.en,
        extras: myExtras,
      });

      await AsyncStorage.setItem('cart', JSON.stringify(productsArray));
      Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "success"
      });
      updateCart();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View className='flex-1 bg-black'>
      <View className='flex flex-row justify-end items-start h-28 mb-1'>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* White Container */}
      <View className='flex-1 bg-white rounded-3xl relative'>

        {/* Image */}
        <View className="-top-9 h-32 flex flex-row bg-transparent items-center justify-center">
          <Image
            source={{ uri: product.image }}
            className="w-1/3 h-32"
            resizeMode="contain"
          />
        </View>

        {/* Title & Description */}
        <Text className='font-bold text-3xl px-6 my-1 capitalize'>{product.title.en}</Text>
        <Text className='text-base px-6 my-1'>{product.description?.en}</Text>

        <ScrollView>
          {product.details.size &&
            <View className='h-40 bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Size</Text>
              <View className='flex flex-row justify-evenly'>
                {sizes.map(s =>
                  <TouchableOpacity key={s.title.en} onPress={() => { setSize(s.title.en) }} className={`h-16 w-1/4 mx-3 flex items-center justify-center rounded-xl ${s.title.en === size ? 'bg-[#ff5f00]' : 'bg-black'}`} >
                    <Text className='text-white text-xl'>{s.title.en.slice()}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }

          {product.details.bread &&
            <View className='h-auto bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Bread</Text>
              {breads.map(b => (product.category === 'chicken sandwiches' && b.title.en === 'lettuce bun') ? '' :
                <TouchableOpacity key={b.title.en} className={`${b.title.en === bread ? 'bg-[#ff5f00]' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between`} onPress={() => { setBread(b.title.en) }}>
                  <Text className={`${b.title.en === bread ? 'text-white' : 'text-black'} font-bold text-xl capitalize`}>{b.title.en}</Text>
                </TouchableOpacity>
              )}
            </View>
          }

          {product.details.comboOptions &&
            <View className='h-auto bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Combo Options</Text>
              {comboOptions.map(co => co.title.en === 'no combo' ? '' :
                <TouchableOpacity key={co.title.en} onPress={() => { comboOption === co.title.en ? setComboOption('no combo') : setComboOption(co.title.en) }}>
                  <View className={`${co.title.en === comboOption ? 'bg-orange-100 border-[#ff5f00]' : 'bg-white border-transparent'} border-2 w-11/12 md:w-80 rounded-xl shadow-lg p-2 mx-auto my-2 flex flex-row `}>
                    <View className="h-32 w-1/3 flex flex-row bg-transparent items-center justify-center">
                      <Image source={{ uri: co.image }} className="w-full h-32" resizeMode="contain" />
                    </View>
                    <View className="w-2/3 h-32">
                      <Text className="text-lg font-semibold uppercase">{co.title.en}</Text>
                      <Text className="text-neutral-400 my-2">{co.description.en}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }


          {product.details.drinks && comboOption !== 'no combo' &&
            <View className='h-auto bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Drinks</Text>
              {drinks.map(d =>
                <TouchableOpacity key={d.title.en} onPress={() => { setDrink(d.title.en) }}>
                  <View className={`w-11/12 bg-white md:w-80 rounded-xl shadow-lg p-2 mx-auto my-2 flex flex-row`}>
                    <View className="w-2/3 flex flex-row">
                      <MaterialIcons
                        name={d.title.en === drink ? 'radio-button-checked' : 'radio-button-unchecked'}
                        size={24} style={{ marginHorizontal: 3, color: d.title.en === drink ? '#f97316' : 'black' }} />
                      <Text className={`${d.title.en === drink ? 'text-orange-500' : ''} mx-2 text-lg font-semibold capitalize`}>
                        {d.title.en}
                      </Text>
                    </View>
                    <View className="w-1/3 flex flex-row bg-transparent items-center justify-center">
                      <Text className={`${d.title.en === drink ? 'text-orange-500' : ''}`}>+ {d.price} EGP</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }

          {product.details.extras &&
            <View className='h-auto bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Extras</Text>
              {extras.map(extra =>
                <TouchableOpacity key={extra.title.en} onPress={() => {
                  setMyExtras(prevExtras => {
                    if (prevExtras.includes(extra.title.en)) {
                      return prevExtras.filter(me => me !== extra.title.en);
                    } else {
                      return [...prevExtras, extra.title.en];
                    }
                  });
                }}>
                  <View className={`w-11/12 bg-white md:w-80 rounded-xl shadow-lg p-2 mx-auto my-2 flex flex-row`}>
                    <View className="w-2/3 flex flex-row">
                      <MaterialIcons name={myExtras.includes(extra.title.en) ? 'check-box' : 'check-box-outline-blank'} size={24}
                        style={{ marginHorizontal: 3, color: myExtras.includes(extra.title.en) ? '#f97316' : 'black' }} />
                      <Text className={`${myExtras.includes(extra.title.en) ? 'text-orange-500' : ''} mx-2 text-lg font-semibold capitalize`}>
                        {extra.title.en}
                      </Text>
                    </View>
                    <View className="w-1/3 flex flex-row bg-transparent items-center justify-center">
                      <Text className={`${myExtras.includes(extra.title.en) ? 'text-orange-500' : ''}`}>
                        + {extra.price} EGP
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity onPress={async () => { await addToCart() }} className='bg-[#ff5f00] w-11/12 mx-auto my-6 p-3 rounded-xl flex flex-row justify-between'>
          <View className='flex flex-row '>
            <MaterialIcons name='shopping-bag' size={24} color={'white'} />
            <Text className='mx-2 text-white text-center font-bold text-lg'>
              Add To Cart
            </Text>
          </View>
          <Text className="text-xl font-bold text-white">{totalPrice} EGP</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}