import { View, Text, Button } from 'react-native'

export default function Account({ navigation }) {
  return (
    <View>
      <Text>Account</Text>
      <Button onPress={() => { navigation.navigate('Settings') }} title='Back' />
    </View>
  )
}