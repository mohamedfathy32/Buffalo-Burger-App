import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ProductCard({ prd = false }) {
  const product =
    prd === false
      ? {
          title: "shiitake mushroom",
          description:
            "Sautéed mushroom, cheddar cheese, and creamy mayonnaise spread on top of our pure beef burger patty.",
          image:
            "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2Fa76de047b66f2511962b600232c60769.png&w=256&q=75",
          imageWithCombo:
            "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3.eu-west-1.amazonaws.com%2Fmenu_items%2F74cd2faaa22109ae867c94197aa6b5fc.png&w=96&q=75",
          category: "burger",
          topSelling: true,
          details: {
            size: [
              { title: "150gm", price: 155 },
              { title: "200gm", price: 190 },
              { title: "400gm", price: 280 },
            ],
            bread: [
              { title: "white", price: 0 },
              { title: "brown", price: 5 },
            ],
            comboOptions: true,
            drinks: true,
            extras: true,
          },
        }
      : prd;

  return (
    <TouchableOpacity>
      <View className=" w-11/12 md:w-80 bg-neutral-200 rounded-xl shadow-lg p-4 mx-auto my-2 flex flex-row ">
        <View className="h-32 w-1/3 flex flex-row bg-transparent items-center justify-center">
          <Image
            source={{ uri: product.image }}
            className="w-full h-32"
            resizeMode="contain"
          />
        </View>

        <View className="w-2/3 h-32">
          <Text className="text-lg font-semibold uppercase">
            {product.title}
          </Text>
          <Text className="text-neutral-400 my-2 line-clamp-2">
            {product.description}
          </Text>

          <View className="flex-row justify-between items-center mt-auto">
            <Text className="text-xl font-bold">
              {product.details.size[0].price} L.E
            </Text>
            <View className="bg-orange-500 p-1 rounded-full">
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color={"white"}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
