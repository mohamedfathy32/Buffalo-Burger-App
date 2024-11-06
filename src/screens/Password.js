import { View, Text, Button } from 'react-native'

export default function Password({ navigation }) {
  return (
    <View>
      <Text>Password</Text>
      <Button onPress={() => { navigation.navigate('Settings'); }} title='Back' />
    </View>
  )
}