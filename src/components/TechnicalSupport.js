import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function TechnicalSupport() {
    return (
        <TouchableOpacity>

            <View className="w-11/12 md:w-80 bg-neutral-200 rounded-xl shadow-lg  mx-auto my-6 flex flex-row ">

                <View className="relative h-32 w-1/3 flex flex-row bg-transparent items-center justify-center ">
                    <Image
                        source={require('../assets/CallUs.png')}
                        className="w-full h-32 absolute -top-1/2"
                        resizeMode="contain"
                    />
                </View>

                <View className="w-2/3 h-24 p-4">
                    <Text className="text-orange-500 text-lg font-bold uppercase">Technical Support</Text>
                    <Text className="my-2 line-clamp-2">Have any questions ? Don't hesitate calling us . </Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}