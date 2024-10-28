import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MealDetails({ navigation, route }) {

  const { product } = route.params;

  const [volume, setVolume] = useState(150);
  const [bread, setBread] = useState('white');

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
          <Text className='font-bold text-3xl px-6 my-1'>{product.title.en}</Text>
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
            <View className='h-52 bg-neutral-200 my-1'>

              <Text className='text-center font-bold text-lg my-4'>Bread</Text>

              <TouchableOpacity className={`${bread === 'white' ? 'bg-orange-600' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between`}
                onPress={() => { setBread('white') }}
              >
                <Text className={`${bread === 'white' ? 'text-white' : 'text-black'} font-bold text-xl`}>White Bread</Text>
              </TouchableOpacity>

              <TouchableOpacity className={`${bread === 'brown' ? 'bg-orange-600' : 'bg-white'} w-11/12 mx-auto my-2 p-3 rounded-xl flex flex-row justify-between items-center`}
                onPress={() => { setBread('brown') }}
              >
                <Text className={`${bread === 'brown' ? 'text-white' : 'text-black'} font-bold text-xl`}>Brown Bread</Text>
                <Text className={`${bread === 'brown' ? 'text-white' : 'text-black'} text-sm`}>+ 5 L.E</Text>
              </TouchableOpacity>



            </View>


          </ScrollView>

          {/* Add Button */}
          <TouchableOpacity className='bg-orange-600 w-11/12 mx-auto my-6 p-3 rounded-xl flex flex-row justify-between'>

            <View className='flex flex-row '>
              <MaterialIcons name='shopping-bag' size={24} color={'white'} />
              <Text className='mx-2 text-white text-center font-bold text-lg'>
                Add To Cart
              </Text>
            </View>

            <Text className="text-xl font-bold text-white">{product.price} L.E</Text>

          </TouchableOpacity>

        </View>

      </View>
    </>
  )
}