import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuScreen from './MenuScreen';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import Settings from './Settings';
import RequestsScreen from './RequestsScreen';
import AddressScreen from './AddressScreen';
import ReviewScreen from './ReviewScreen';
import Account from './Account';
import Password from './Password';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MainScreen from './MainScreen';
import { NotificationContext } from '../utils/context';

export default function LayoutScreen({ navigation }) {

  const { notifications, updateNotifications } = useContext(NotificationContext);

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
      initialRouteName='Main'
      screenOptions={({ route }) => ({

        tabBarLabel: ({ focused }) => (
          <Text className={focused ? 'text-orange-500' : ''}>
            {route.name}
          </Text>
        ),

      })}

    >

      <Tab.Screen name='Profile' component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="user" size={24} color={focused ? "#f97316" : "black"} />,
          headerTitle: '',
          headerLeft: () => <TouchableOpacity className='mx-6 bg-orange-500 p-1 rounded-full'
            onPress={() => {
              navigation.navigate('Settings');
            }}
          >

            <Ionicons name="settings-sharp" size={24} color="white" />

          </TouchableOpacity>,

          headerRight: () => <Text className='mx-4 font-bold text-2xl'>Profile</Text>,

        }}
      />

      <Tab.Screen name='Menu' component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => < AntDesign name="appstore1" size={24} color={focused ? "#f97316" : "black"} />,
          header: () => <View className='flex flex-row justify-between py-3'>

            <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }}>
              <View className='relative mx-10 p-1 bg-orange-500 rounded-full flex flex-row justify-center'>
                <MaterialIcons name='shopping-bag' size={24} color={'white'} />

                <View className={`${notifications ? 'flex' : 'hidden'} absolute -top-1/3 -right-2/3 w-6 h-6 bg-white rounded-full justify-center items-center`}>
                  <View className='w-5 h-5 bg-orange-500 rounded-full flex justify-center items-center'>
                    <Text className='text-white'>{notifications}</Text>
                  </View>
                </View>

              </View>
            </TouchableOpacity>

            <View className='flex flex-row justify-center w-2/3'>
              <Text className='font-bold text-2xl px-5'>Hello, Mohamed</Text>
            </View>

          </View>
        }}
      />

      <Tab.Screen name='Main' component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => <Entypo name="home" size={24} color={focused ? "#f97316" : "black"} />,
          header: () => <View className='flex flex-row justify-between py-3'>

            <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }}>
              <View className='relative mx-10 p-1 bg-orange-500 rounded-full flex flex-row justify-center'>
                <MaterialIcons name='shopping-bag' size={24} color={'white'} />

                <View className={`${notifications ? 'flex' : 'hidden'} absolute -top-1/3 -right-2/3 w-6 h-6 bg-white rounded-full justify-center items-center`}>
                  <View className='w-5 h-5 bg-orange-500 rounded-full flex justify-center items-center'>
                    <Text className='text-white'>{notifications}</Text>
                  </View>
                </View>

              </View>
            </TouchableOpacity>

            <View className='flex flex-row justify-center w-2/3'>
              <Text className='font-bold text-2xl px-5'>Hello, Mohamed</Text>
            </View>

          </View>
        }}
      />

      <Tab.Screen name='Settings' component={Settings}
        options={{
          // tabBarStyle: { display: 'none' },
          tabBarButton: () => null,

          header: () => <View className='flex flex-row justify-end items-center my-3 '>
            <Text className='mx-4 text-xl font-bold'>Settings</Text>
            <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
              {/* En */}
              {/* <MaterialIcons name='arrow-back' size={24} /> */}
              {/* Ar */}
              <MaterialIcons name='arrow-forward' size={24} />
            </TouchableOpacity>
          </View>,

        }}
      />

      <Tab.Screen name='Requests' component={RequestsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,

          header: () => <View className='flex flex-row justify-end items-center my-3 '>
            <Text className='mx-4 text-xl font-bold'>My Requests</Text>
            <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
              {/* En */}
              {/* <MaterialIcons name='arrow-back' size={24} /> */}
              {/* Ar */}
              <MaterialIcons name='arrow-forward' size={24} />
            </TouchableOpacity>
          </View>,

        }}
      />

      <Tab.Screen name='Address' component={AddressScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,

          header: () => <View className='flex flex-row justify-end items-center my-3 '>
            <Text className='mx-4 text-xl font-bold'>Saved Addresses</Text>
            <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
              {/* En */}
              {/* <MaterialIcons name='arrow-back' size={24} /> */}
              {/* Ar */}
              <MaterialIcons name='arrow-forward' size={24} />
            </TouchableOpacity>
          </View>,

        }}
      />

      <Tab.Screen name='Review' component={ReviewScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,

          header: () => <View className='flex flex-row justify-end items-center my-3 '>
            <Text className='mx-4 text-xl font-bold'>Review</Text>
            <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
              {/* En */}
              {/* <MaterialIcons name='arrow-back' size={24} /> */}
              {/* Ar */}
              <MaterialIcons name='arrow-forward' size={24} />
            </TouchableOpacity>
          </View>,

        }}
      />
      <Tab.Screen name='Account' component={Account}
        options={{
          tabBarButton: () => null,

        }}
      />

      <Tab.Screen name='Password' component={Password}
        options={{
          tabBarButton: () => null,

        }}
      />

      <Tab.Screen name='MealDetails' component={MealDetails}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,

          header: () => <View className='flex flex-row justify-end items-center my-3 '>
            <Text className='mx-4 text-xl font-bold'>Saved Addresses</Text>
            <TouchableOpacity className='mx-4' onPress={() => { navigation.goBack(); }}>
              {/* En */}
              {/* <MaterialIcons name='arrow-back' size={24} /> */}
              {/* Ar */}
              <MaterialIcons name='arrow-forward' size={24} />
            </TouchableOpacity>
          </View>,

        }}
      />

    </ Tab.Navigator >

  )
}