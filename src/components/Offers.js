import { useEffect, useState } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { fetchData } from '../utils/firebase'

export default function Offers() {
    const [offers, setOffers] = useState([])
    useEffect(() => {
        (async () => {
            setOffers(await fetchData('offers'))
        })()
    }, [])
    return (
        <ScrollView className='px-5' horizontal showsHorizontalScrollIndicator={false}>
            {offers?.map((offer) =>
                <View key={offer.title.en} className="h-40 w-60 mx-1 rounded-xl flex flex-row bg-transparent items-center justify-center">
                    <Image
                        source={{ uri: offer.keenImage }}
                        className="w-full h-full rounded-xl"
                        resizeMode="stretch"
                    />
                </View>
            )}
        </ScrollView>
    )
}