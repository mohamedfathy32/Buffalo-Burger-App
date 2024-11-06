import { useEffect, useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
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
      const userinfo = getUserInfoById(userId);
      if (userinfo) {
        await AsyncStorage.setItem("userId", userId);
        navigation.navigate("BottomLayout");
      }
    } catch (error) {
      setMessage("No such user found");
    }
  };

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("userId");
      const userinfo = await getUserInfoById(id);
      if (userinfo) {
        navigation.navigate("BottomLayout");
      }
    })();
  }, []);

  return (
    <View className={`flex-1 justify-center px-8 bg-black`}>
      <TextInput
        className={`h-12 border border-gray-400 rounded mb-4 px-4 text-white bg-[#333]`}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className={`h-12 border border-gray-400 rounded mb-4 px-4 text-white bg-[#333]`}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className={`bg-[#ff5f00] py-3 rounded-lg mb-2`}
        onPress={handleLogin}
      >
        <Text className={`text-center text-white text-lg font-bold`}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text className={`text-center text-[#ff5f00] text-sm mt-4`}>
          Don’t have an account? Register now
        </Text>
      </TouchableOpacity>
      {message && <Text className={`text-center text-red-500 mt-4`}>{message}</Text>}
    </View>
  );
}
