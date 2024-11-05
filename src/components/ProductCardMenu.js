import { View, Text, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ProductCard({ product }) {
    return (
        <View className=" w-11/12 md:w-80 bg-neutral-200 rounded-xl shadow-lg p-4 mx-auto my-2 flex flex-row ">

            <View className="h-32 w-1/3 flex flex-row bg-transparent items-center justify-center">
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-32"
                    resizeMode="contain"
                />
            </View>

            <View className="w-2/3 h-32">
                <Text className="text-lg font-semibold uppercase">{product.title.en}</Text>
                <Text className="text-neutral-400 my-2 ">{product.description?.en || product.description}</Text>

                <View className="flex-row justify-between items-center mt-auto">
                    <Text className="text-xl font-bold">{product.price} EGP</Text>
                    <View className='bg-orange-500 p-1 rounded-full'>
                        <MaterialIcons name='add-circle-outline' size={24} color={'white'} />
                    </View>
                </View>

            </View>

        </View>
    )
}