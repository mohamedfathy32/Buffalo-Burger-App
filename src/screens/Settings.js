import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Settings({ navigation }) {
  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={() => { navigation.goBack(); }}
        title='Back'
      />
      <Button onPress={() => { navigation.navigate('Account'); }}
        title='Account'
      />
      <Button onPress={() => { navigation.navigate('Password'); }}
        title='Password'
      />
    </View>
  )
}