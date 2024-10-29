import { View, Text, ScrollView } from "react-native";
import React from "react";
import Offers from "../components/Offers";
import CategorySection from "../components/CategorySection";

export default function MenuScreen({ navigation }) {
  
  return (
    <ScrollView>
      {/* Header */}

      <View className="m-5 flex flex-row">
        <Text className="font-bold text-orange-500 text-lg uppercase">
          Hot offers
        </Text>
      </View>

      <Offers />


      <CategorySection navigation={navigation} category="burger sandwiches" />
      <CategorySection navigation={navigation} category="chicken sandwiches" />
      <CategorySection navigation={navigation} category="keto & light sandwiches" />
      <CategorySection navigation={navigation} category="appetizers" />
      <CategorySection navigation={navigation} category="sauces" />
      <CategorySection navigation={navigation} category="desserts" />
      <CategorySection navigation={navigation} category="drinks" />
    </ScrollView>
  );
}
