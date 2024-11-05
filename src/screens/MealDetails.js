import { React, useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ComboOption from '../components/ComboOption';
import { breadList, comboOptionsList, extrasList } from '../utils/data';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NotificationContext } from '../utils/context';



export default function MealDetails({ navigation, route }) {

  const { product } = route.params;
  const [volume, setVolume] = useState(150);
  const [bread, setBread] = useState(0);
  const [combo, setCombo] = useState({ title: 'no combo', price: 0 });
  const [extra, setExtra] = useState(0);
  const [extraList, setExtraList] = useState([0, 0, 0, 0, 0, 0]);
  const total = product.price + breadList[bread].price + combo.price + extra;
  const { updateNotifications } = useContext(NotificationContext);

  const extraCal = (index) => {
    setExtraList(
      () => {
        const updatedList = extraList.map((e, i) => i === index ? e === 0 ? 1 : 0 : e);
        var extrasTotal = 0;
        updatedList.map((e, i) => e === 1 ? extrasTotal += extrasList[i].price : extrasTotal);
        setExtra(extrasTotal);
        return updatedList;
      }
    );

  };

  const addToCart = async () => {
    try {
      const productsStorage = await AsyncStorage.getItem('cart');
      let productsArray = productsStorage ? JSON.parse(productsStorage) : [];

      productsArray.push({
        id: Date.now(),
        title: product.title.en,
        description: product.description.en || product.description,
        img: product.image,
        price: product.price,
        total,
        volume,
        bread,
        combo,
        extraList,
        quantity: 1,
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
          <Text className='font-bold text-3xl px-6 my-1'>{product.title.en || product.title}</Text>
          <Text className='text-base px-6 my-1'>{product.description.en || product.description}</Text>

          <ScrollView>

            {/* Volume */}
            <View className='h-40 bg-neutral-200 my-1'>
              <Text className='text-center font-bold text-lg my-4'>Volume</Text>
              <View className='flex flex-row justify-evenly'>

                <TouchableOpacity onPress={() => { setVolume(150); }}
                  className={`h-16 w-1/4 mx-3 flex items-center justify-center rounded-xl ${volume === 150 ? 'bg-orange-600' : 'bg-black'}`}
                >
                  <Text className='text-white text-2xl'>150</Text>
                  <Text className='text-white text-lg'>gm</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setVolume(200); }}
                  className={`h-16 w-1/4 mx-3 flex items-center justify-center rounded-xl ${volume === 200 ? 'bg-orange-600' : 'bg-black'}`}
                >
                  <Text className='text-white text-2xl'>200</Text>
                  <Text className='text-white text-lg'>gm</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setVolume(400); }}
                  className={`h-16 w-1/4 mx-3 flex items-center justify-center rounded-xl ${volume === 400 ? 'bg-orange-600' : 'bg-black'}`}
                >
                  <Text className='text-white text-2xl'>400</Text>
                  <Text className='text-white text-lg'>gm</Text>
                </TouchableOpacity>



              </View>
            </View>

            {/* Bread */}
            <View className='h-auto bg-neutral-200 my-1'>

              <Text className='text-center font-bold text-lg my-4'>Bread</Text>

              <TouchableOpacity className={`${breadList[bread].title.en === 'white' ? 'bg-orange-600' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between`}
                onPress={() => { setBread(0) }}
              >
                <Text className={`${breadList[bread].title.en === 'white' ? 'text-white' : 'text-black'} font-bold text-xl`}>White Bread</Text>
              </TouchableOpacity>

              <TouchableOpacity className={`${breadList[bread].title.en === 'brown' ? 'bg-orange-600' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between items-center`}
                onPress={() => { setBread(1) }}
              >
                <Text className={`${breadList[bread].title.en === 'brown' ? 'text-white' : 'text-black'} font-bold text-xl`}>Brown Bread</Text>
                <Text className={`${breadList[bread].title.en === 'brown' ? 'text-white' : 'text-black'} text-sm`}>+ 5 L.E</Text>
              </TouchableOpacity>

              <TouchableOpacity className={`${breadList[bread].title.en === 'lettuce bun' ? 'bg-orange-600' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between items-center`}
                onPress={() => { setBread(2) }}
              >
                <Text className={`${breadList[bread].title.en === 'lettuce bun' ? 'text-white' : 'text-black'} font-bold text-xl`}>Lettuce Bun</Text>
                <Text className={`${breadList[bread].title.en === 'lettuce bun' ? 'text-white' : 'text-black'} text-sm`}>+ 30 L.E</Text>
              </TouchableOpacity>



            </View>

            {/* Combo Options */}
            <View className='h-auto bg-neutral-200 my-1'>

              <Text className='text-center font-bold text-lg my-4'>Combo Options</Text>

              {/* Option */}
              {
                comboOptionsList.map((option) => <TouchableOpacity
                  key={option.title.en}
                  onPress={() => { combo.title === option.title.en ? setCombo({ title: 'no combo', price: 0 }) : setCombo({ title: option.title.en, price: option.price }); }}>
                  <ComboOption option={option} value={combo.title === option.title.en} />
                </TouchableOpacity>

                )
              }
              {/*  */}

            </View>


            {/* Extras */}
            <View className='h-auto bg-neutral-200 my-1'>

              <Text className='text-center font-bold text-lg my-4'>Extras</Text>

              {/* Extra */}
              {
                extrasList.map((e, i) =>
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      extraCal(i);
                    }}>

                    <View className={`w-11/12 bg-white md:w-80 rounded-xl shadow-lg p-2 mx-auto my-2 flex flex-row `}>

                      <View className="w-2/3 flex flex-row">
                        <MaterialIcons name={extraList[i] ? 'check-box' : 'check-box-outline-blank'} size={24} style={{ marginHorizontal: 3, color: extraList[i] ? '#f97316' : `black` }} />
                        <Text className={`${extraList[i] === 0 ? '' : 'text-orange-500'} mx-2 text-lg font-semibold uppercase`}>{e.title.en}</Text>
                      </View>

                      <View className="w-1/3 flex flex-row bg-transparent items-center justify-center">
                        <Text className={`${extraList[i] === 0 ? '' : 'text-orange-500'}`}>+ {e.price} EGP</Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                )
              }

              {/*  */}

            </View>

          </ScrollView>

          {/* Add Button */}
          <TouchableOpacity className='bg-orange-600 w-11/12 mx-auto my-6 p-3 rounded-xl flex flex-row justify-between'
            onPress={async () => {
              await addToCart();
            }}
          >

            <View className='flex flex-row '>
              <MaterialIcons name='shopping-bag' size={24} color={'white'} />
              <Text className='mx-2 text-white text-center font-bold text-lg'>
                Add To Cart
              </Text>
            </View>

            <Text className="text-xl font-bold text-white">{total} EGP</Text>

          </TouchableOpacity>

        </View>

      </View >
    </>
  )
}