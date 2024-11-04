import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'

export default function CartCard({ product }) {

    const [reveal, setReveal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <View className={`${quantity ? '' : 'hidden'} h-auto bg-white w-11/12 mx-auto my-2 rounded-2xl`}>

                <View className='flex flex-row justify-between'>

                    <View className='flex flex-row w-4/5 my-3'>
                        <Image
                            source={{ uri: product.img }}
                            className="w-1/2 h-auto"
                            resizeMode="contain"
                        />
                        <View className='flex'>
                            <Text className='text-lg font-bold'>{product.title}</Text>
                            <Text className=''>{product.total||product.price} EGP</Text>
                            <View className='flex flex-row justify-around items-center my-1 w-3/4'>

                                <TouchableOpacity
                                    className=' bg-white p-1 rounded-full border-2 border-orange-600'
                                    onPress={() => { setQuantity(quantity - 1) }}>
                                    <MaterialIcons name='remove' size={20} color={'#f97316'} />
                                </TouchableOpacity>

                                {/* value */}
                                <Text className='w-1/3 text-center'>{quantity}</Text>

                                <TouchableOpacity
                                    className='bg-orange-600 p-1 border-2 border-transparent rounded-full'
                                    onPress={() => { setQuantity(quantity + 1) }}
                                >
                                    <MaterialIcons name='add' size={20} color={'white'} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <TouchableOpacity 
                    className='mx-6'
                    onPress={() => { reveal ? setReveal(false) : setReveal(true) }}>
                        <MaterialIcons name={reveal ? `arrow-drop-up` : `arrow-drop-down`} size={60} />
                    </TouchableOpacity>

                </View>
                {/* Hidden Item */}
                <Text className={`p-3 ${reveal ? `` : `hidden`} text-stone-400`}>{product?.description}</Text>

            </View>
        </>
    )
}