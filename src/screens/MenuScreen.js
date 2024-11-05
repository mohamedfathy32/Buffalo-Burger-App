import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Offers from "../components/Offers";
import CategorySection from "../components/CategorySection";
import { fetchData } from "../utils/firebase";

export default function MenuScreen({ navigation }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      setCategories(await fetchData('categories'))
    })()
  }, [])


  return (
    <ScrollView>
      <View className="m-5 flex flex-row">
        <Text className="font-bold text-orange-500 text-lg uppercase">
          Hot offers
        </Text>
      </View>


      {categories.map(cat =>
        cat.title.en === 'offers' ? <Offers /> : <CategorySection navigation={navigation} category={cat.title.en} />
      )}
    </ScrollView>
  );
}