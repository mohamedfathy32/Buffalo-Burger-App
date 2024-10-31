import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "../components/Hr";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../AuthContext ";
import { getUserByUid } from "../utils/firebase";

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const [userName, setUserName] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUserData = async () => {
      const data = await getUserByUid(user.uid);
      setUserName(data.username);
      setUserPhone(data.phone);
      setLoading(false);
    };

    loadUserData();


    
  }, []);
  if (loading) {
    return <Text>Loading...</Text>; 
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      {console.log(user)}
      <ScrollView>
        {/* To convert to english add flex-row-reverse in the className of the view  */}
        {/* En => flex-row-reverse */}

        {/* Row 1 - Name & Number & Avatar*/}
        <View className="flex flex-row items-center justify-end my-6">
          {/* Name & Number */}
          <View className="flex items-start">
            <Text className="font-bold text-lg">{userName}</Text>
            <Text>{userPhone}</Text>
          </View>

          {/* Avatar */}
          <View className="bg-orange-200 rounded-full justify-center p-6 mx-4">
            <Text className="font-bold text-xl">MO</Text>
          </View>
        </View>

        <Hr />

        {/* Row 2 - Requests*/}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Requests");
          }}
        >
          <View className="flex flex-row items-center my-6 w-11/12 mx-auto justify-end ">
            <Text className="mx-3"> My Requests</Text>
            <Entypo name="shopping-bag" size={24} color={"#f97316"} />
          </View>
        </TouchableOpacity>

        <Hr />

        {/* Row 3 - Addresses*/}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Address");
          }}
        >
          <View className="flex flex-row items-center my-6 w-11/12 mx-auto justify-end ">
            <Text className="mx-3"> Saved Addresses</Text>
            <MaterialCommunityIcons
              name="home-map-marker"
              size={24}
              color={"#f97316"}
            />
          </View>
        </TouchableOpacity>

        <Hr />

        {/* Row 4 - Shopping Cart*/}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <View className="flex flex-row items-center my-6 w-11/12 mx-auto justify-end ">
            <Text className="mx-3"> Shopping Cart</Text>
            <FontAwesome6 name="cart-shopping" size={24} color={"#f97316"} />
          </View>
        </TouchableOpacity>

        <Hr />

        {/* Row 5 - Review / Evaluation*/}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Review");
          }}
        >
          <View className="flex flex-row items-center my-6 w-11/12 mx-auto justify-end ">
            <Text className="mx-3"> Review</Text>
            <MaterialIcons name="rate-review" size={24} color={"#f97316"} />
          </View>
        </TouchableOpacity>

        <Hr />

        {/* Row 6 - Call Technical Support*/}
        <TouchableOpacity onPress={() => {}}>
          <View className="flex flex-row items-center my-6 w-11/12 mx-auto justify-between">
            <Text className="font-bold">19914</Text>

            <View className="flex flex-row">
              <Text className="mx-3"> Call Technical Support</Text>
              <MaterialIcons name="call" size={24} color={"#f97316"} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
