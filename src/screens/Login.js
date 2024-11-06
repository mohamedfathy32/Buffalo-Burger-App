import { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { getUserInfoById, login } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      const userId = userCredential.user.uid;
      const userinfo = getUserInfoById(userId)
      if (userinfo) {
        await AsyncStorage.setItem('userId', userId);
        navigation.navigate('BottomLayout')
      }
    } catch (error) {
      // console.warn(error.message)
      setMessage('not such user')
    }
  };
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        navigation.navigate('BottomLayout')
      }
    })()
  }, [])


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 15,
    textAlign: "center",
  },
});
