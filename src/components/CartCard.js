import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../utils/context';

export default function CartCard({ product, refreshCart }) {

    const { updateNotifications } = useContext(NotificationContext);
    const [reveal, setReveal] = useState(false);
    const [quantity, setQuantity] = useState(product.quantity);

    const removeItem = async () => {
        const productsStorage = await AsyncStorage.getItem('cart');
        let productsArray = productsStorage ? JSON.parse(productsStorage) : [];
        let newArr = [];
        productsArray.map((prd) => {
            prd.id !== product.id && newArr.push(prd);
        });
        await AsyncStorage.setItem('cart', JSON.stringify(newArr));
        updateNotifications();
        refreshCart();

    };

    const modifyItem = async (q) => {
        const productsStorage = await AsyncStorage.getItem('cart');
        let productsArray = productsStorage ? JSON.parse(productsStorage) : [];
        let newArr = [];
        productsArray.map((prd) => {

            if (prd.id === product.id) {
                prd.quantity = q;
            }

            newArr.push(prd);
        });
        await AsyncStorage.setItem('cart', JSON.stringify(newArr));
        updateNotifications();
        refreshCart();
    };

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
                            <Text className=''>{(product.total || product.price) * quantity} EGP</Text>
                            <View className='flex flex-row justify-around items-center my-1 w-3/4'>

                                <TouchableOpacity
                                    className=' bg-white p-1 rounded-full border-2 border-orange-600'
                                    onPress={() => {
                                        (quantity - 1) === 0 ? removeItem() : modifyItem(quantity - 1);
                                        setQuantity(quantity - 1);
                                    }}>
                                    <MaterialIcons name='remove' size={20} color={'#f97316'} />
                                </TouchableOpacity>

                                {/* value */}
                                <Text className='w-1/3 text-center'>{quantity}</Text>

                                <TouchableOpacity
                                    className='bg-orange-600 p-1 border-2 border-transparent rounded-full'
                                    onPress={() => {
                                        modifyItem(quantity + 1);
                                        setQuantity(quantity + 1);
                                    }}
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