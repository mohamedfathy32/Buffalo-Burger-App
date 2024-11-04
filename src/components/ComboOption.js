import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ComboOption({ option,value=false }) {
    return (
        <>
            {/* false => bg-white */}
            {/* true => bg-orange-100 border-2 border-orange-600 */}
            <View className={`${value?'bg-orange-100 border-orange-600':'bg-white border-transparent'} border-2 w-11/12 md:w-80 rounded-xl shadow-lg p-2 mx-auto my-2 flex flex-row `}>

                <View className="h-32 w-1/3 flex flex-row bg-transparent items-center justify-center">
                    <Image
                        source={{ uri: option.image }}
                        className="w-full h-32"
                        resizeMode="contain"
                    />
                </View>

                <View className="w-2/3 h-32">
                    <Text className="text-lg font-semibold uppercase">{option.title.en}</Text>
                    <Text className="text-neutral-400 my-2 line-clamp-2">{option.description.en}</Text>

                </View>

            </View>
        </>
    )
}