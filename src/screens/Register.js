import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, register } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !phone || !email || !password) {
      setMessage("All fields are required");
      return;
    }
    try {
      const userCredential = await register(email, password);
      const userId = userCredential?.user.uid;

      if (userId) {
        await setDoc(doc(db, "users", userId), {
          email: email,
          username: username,
          phone: phone
        });
        await AsyncStorage.setItem("userId", userId);
        navigation.navigate("BottomLayout");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View className={`flex-1 justify-center px-8 bg-black`}>
      <View className='w-full bg-transparent'>
        <Text className={`text-center text-white text-2xl font-bold mb-4`}>
          Register
        </Text>
      </View>
      <View className='h-1/3 w-full bg-transparent'>
        <Image
          source={require('../assets/BG.png')} className='w-full h-full'
        />
      </View>
      <TextInput
        className={`h-12 border border-gray-400 rounded mb-4 px-4 text-white bg-[#333]`}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className={`h-12 border border-gray-400 rounded mb-4 px-4 text-white bg-[#333]`}
        placeholder="Phone"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
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
        onPress={handleRegister}
      >
        <Text className={`text-center text-white text-lg font-bold`}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className={`text-center text-[#ff5f00] text-sm mt-4`}>
          Already have an account ? <Text className='font-bold'>Login</Text>
        </Text>
      </TouchableOpacity>
      {message && (
        <Text className={`text-center text-red-500 mt-4`}>{message}</Text>
      )}
    </View>
  );
}
