import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Password({navigation}) {
  return (
    <View>
      <Text>Password</Text>
      <Button onPress={() => { navigation.navigate('Settings'); }}
        title='Back'
      />
    </View>
  )
}