import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from './ProfileScreen';
import Settings from './Settings';
import Test from './Test';

export default function ProfileLayout() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>

                <Stack.Navigator

                    initialRouteName='Profile'

                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    <Stack.Screen name='Test' component={Test} />
                    <Stack.Screen name='Settings' component={Settings}

                        options={{

                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: {
                                display: 'none'
                            },

                        }}

                    />

                </Stack.Navigator>

            </SafeAreaView>

        </>
    )
}