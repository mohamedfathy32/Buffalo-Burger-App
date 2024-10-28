import React from 'react'
import { View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { offersList } from '../utils/data'

export default function Offers() {
    return (
        <ScrollView className='px-5' horizontal showsHorizontalScrollIndicator={false}>
            {offersList.map((offer) =>
                <TouchableOpacity key={offer.title}>
                    <View  className="h-40 w-60 mx-1 rounded-xl flex flex-row bg-transparent items-center justify-center">
                        <Image
                            source={{ uri: offer.image }}
                            className="w-full h-full rounded-xl"
                            resizeMode="stretch"
                        />
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )
}