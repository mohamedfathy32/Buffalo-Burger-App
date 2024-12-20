import { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CartContext } from '../utils/CartContext';
import ProfileScreen from '../screens/Profile';
import MenuScreen from '../screens/Menu';
import HomeScreen from '../screens/Home';
import Account from '../screens/Account';
import Password from '../screens/Password';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoById } from '../utils/firebase';

export default function BottomLayout({ navigation }) {
  const { cart, updateCart } = useContext(CartContext);
  const Tab = createBottomTabNavigator();
  const [username, setUsername] = useState('')

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem('userId')
      const data = await getUserInfoById(userId);
      setUsername(data.username)

    })()
  }, [])




  return (
    <Tab.Navigator
      initialRouteName='Main'
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => (
          <Text className={focused ? 'text-orange-500' : ''}>
            {route.name}
          </Text>
        )
      })}>

      <Tab.Screen name='Home' component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Entypo name="home" size={24} color={focused ? "#f97316" : "black"} />,
          header: () => <View className='flex flex-row justify-between py-3'>
            <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }}>
              <View className='relative mx-10 p-1 bg-orange-500 rounded-full flex flex-row justify-center'>
                <MaterialIcons name='shopping-bag' size={24} color={'white'} />
                <View className={`${cart ? 'flex' : 'hidden'} absolute -top-1/3 -right-2/3 w-6 h-6 bg-white rounded-full justify-center items-center`}>
                  <View className='w-5 h-5 bg-orange-500 rounded-full flex justify-center items-center'>
                    <Text className='text-white'>{cart}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View className='flex flex-row justify-center w-2/3'>
              <Text className='font-bold text-2xl px-5'>Hello, {username.split(' ')[0]}</Text>
            </View>
          </View>
        }} />

      <Tab.Screen name='Menu' component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => < AntDesign name="appstore1" size={24} color={focused ? "#f97316" : "black"} />,
          header: () => <View className='flex flex-row justify-between py-3'>
            <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }}>
              <View className='relative mx-10 p-1 bg-orange-500 rounded-full flex flex-row justify-center'>
                <MaterialIcons name='shopping-bag' size={24} color={'white'} />
                <View className={`${cart ? 'flex' : 'hidden'} absolute -top-1/3 -right-2/3 w-6 h-6 bg-white rounded-full justify-center items-center`}>
                  <View className='w-5 h-5 bg-orange-500 rounded-full flex justify-center items-center'>
                    <Text className='text-white'>{cart}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View className='flex flex-row justify-center w-2/3'>
              <Text className='font-bold text-2xl px-5'>Hello, {username.split(' ')[0]}</Text>
            </View>
          </View>
        }} />

      <Tab.Screen name='Profile' component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="user" size={24} color={focused ? "#f97316" : "black"} />,
          headerTitle: '',
          headerLeft: () => <TouchableOpacity className='mx-6 bg-orange-500 p-1 rounded-full'
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>,
          headerRight: () => <Text className='mx-4 font-bold text-2xl'>Profile</Text>,
        }} />

      <Tab.Screen name='Account' component={Account} options={{ tabBarButton: () => null, }} />
      <Tab.Screen name='Password' component={Password} options={{ tabBarButton: () => null, }} />
    </ Tab.Navigator >
  )
}