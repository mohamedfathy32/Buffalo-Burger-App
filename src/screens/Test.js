import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Test({ navigation }) {
    return (
        <View>
            <Text>Test</Text>
            <Button onPress={() => { navigation.pop(); }}
                title='Back'
            />
        </View>
    )
}