import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity } from 'react-native'

export default function OrderHistory({ navigation }) {
  return (
    <View className='flex-1'>

      {/* Header */}
      <View className='flex flex-row justify-end items-center my-3 '>
        <Text className='mx-4 text-xl font-bold'>My Requests</Text>
        <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
          <MaterialIcons name='arrow-forward' size={24} />
        </TouchableOpacity>
      </View>

      <View className='w-2/3 bg-orange-200 mx-auto p-4 rounded-xl'>
        <Text className='text-orange-500 font-bold text-center'>There are no previous requests</Text>
      </View>

    </View>
  )
}