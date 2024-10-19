import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainScreen from './mainScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LayoutScreen() {

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
      // initialRouteName='Main'
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
          onPress={()=>{

          }}
          >

            <Ionicons name="settings-sharp" size={24} color="white" />

          </TouchableOpacity>,

          headerRight: () => <Text className='mx-4 font-bold text-2xl'>Profile</Text>,

        }}
      />
      <Tab.Screen name='Menu' component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => < AntDesign name="appstore1" size={24} color={focused ? "#f97316" : "black"} />
        }}
      />
      <Tab.Screen name='Main' component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => <Entypo name="home" size={24} color={focused ? "#f97316" : "black"} />,
        }}
      />

    </ Tab.Navigator >

  )
}
