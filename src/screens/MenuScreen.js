import { View, Text, ScrollView } from "react-native";
import React from "react";
import ProductCard from "../components/ProductCard";
import Offers from "../components/Offers";
import { productsList } from "../utils/data";
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

      
      <CategorySection category="burger sandwiches" />
      <CategorySection category="chicken sandwiches" />
      <CategorySection category="keto & light sandwiches" />
      <CategorySection category="appetizers" />
      <CategorySection category="sauces" />
      <CategorySection category="desserts" />
      <CategorySection category="drinks" />
    </ScrollView>
  );
}
