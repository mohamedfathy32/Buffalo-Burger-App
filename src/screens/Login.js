import { useEffect, useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { getUserInfoById, login } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      const userId = userCredential.user.uid;
      const userinfo = getUserInfoById(userId);
      if (userinfo) {
        await AsyncStorage.setItem("userId", userId);
        setShowSuccessAlert(true);
        // navigation.navigate("BottomLayout");
      }
    } catch (error) {
      // setMessage("No such user found");
      setShowErrorAlert(true);
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
      {message && (
        <Text className={`text-center text-red-500 mt-4`}>{message}</Text>
      )}

      <AwesomeAlert
        show={showSuccessAlert}
        showProgress={false}
        // title="Login Successful"
        // message="Welcome back! You've successfully logged in."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#FF5F00"
        onConfirmPressed={() => {
          setShowSuccessAlert(false);
          navigation.navigate("BottomLayout");
        }}
        customView={
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="check-circle" size={50} color="green" />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
              Login Successful
            </Text>
            <Text style={{ marginTop: 5, fontSize: 14, color: "gray" }}>
              Welcome back! You've successfully logged in.
            </Text>
          </View>
        }
      />

      <AwesomeAlert
        show={showErrorAlert}
        showProgress={false}
        title={
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="error" size={50} color="red" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginTop: 10,
              }}
            >
              Login Failed
            </Text>
          </View>
        }
        message="Invalid email or password. Please try again."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Try Again"
        confirmButtonColor="#FF5F00"
        onConfirmPressed={() => setShowErrorAlert(false)}
      />
    </View>
  );
}
