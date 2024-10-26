import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Offers from '../components/Offers';
import MainProductCard from '../components/MainProductCard'
import TechnicalSupport from '../components/TechnicalSupport';

export default function MainScreen() {

    const products = [
        {
            title: "shiitake mushroom",
            description: "Sautéed mushroom, cheddar cheese, and creamy mayonnaise spread on top of our pure beef burger patty.",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2Fa76de047b66f2511962b600232c60769.png&w=256&q=75",
            imageWithCombo: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3.eu-west-1.amazonaws.com%2Fmenu_items%2F74cd2faaa22109ae867c94197aa6b5fc.png&w=96&q=75",
            category: "burger",
            topSelling: true,
            details: {
                size: [
                    { title: '150gm', price: 155 },
                    { title: '200gm', price: 190 },
                    { title: '400gm', price: 280 }
                ],
                bread: [
                    { title: 'white', price: 0 },
                    { title: 'brown', price: 5 }
                ],
                comboOptions: true,
                drinks: true,
                extras: true
            },
        },
        {
            title: "BACON MUSHROOM JACK",
            description: "Beef bacon with fresh sautéed mushroom, cheddar cheese, and creamy mayonnaise.",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2Fd845c9309b0d95d8c5d945b6b2552491.png&w=256&q=75",
            price: "EGP 190",
            category: "burger",
            size: ['150', '200', '250'],
            topSelling: true
        },
        {
            title: "CHICKEN DITCH",
            description: "Chicken strips topped with beef bacon, sautéed mushroom, cheddar cheese, and our custom Secret sauce.",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2Ffce09e6a80b59a8cf77275475988c79a.png&w=256&q=75",
            price: "EGP 185",
            category: "chicken",
            size: ['150', '200', '250'],
            topSelling: false
        },
        {
            title: "CHICKEN BUSTER",
            description: "Chicken strips with Buffalo sauce and melted cheddar cheese.",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2F5f9673352a1f5fafd00e3e2ae90af631.png&w=256&q=75",
            price: "EGP 135",
            category: "chicken",
            size: ['150', '200', '250'],
            topSelling: true,
        },
        {
            title: "APPLE PIE",
            description: "Apple & cinnamon pie",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3.eu-west-1.amazonaws.com%2Fmenu_items%2Ff5afb2abb2f7e443a2d999d1c13164d2.png&w=256&q=75",
            price: "EGP 25",
            category: "desserts",
            size: '',
            topSelling: false
        },
        {
            title: "Chicken Fries",
            description: "10 Pieces of Chicken Fries served with Ranch Cup",
            image: "https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3.eu-west-1.amazonaws.com%2Fmenu_items%2Fb666406ac37bf44f8b31849ec0ee48ed.png&w=256&q=75",
            price: "EGP 80",
            category: "appetizers",
            size: ['150', '200', '250'],
            topSelling: false
        },
    ];

    return (
        <ScrollView>

            <View className='flex-1'>
                <View className='m-5 flex flex-row'>
                    <Text className='font-bold text-orange-500 text-lg uppercase'>Hot offers</Text>
                </View>

                <Offers />

                {/* Products */}
                <View className='m-5 flex flex-row'>
                    <Text className='font-bold text-orange-500 text-lg uppercase'>The Special</Text>
                </View>
                {products.map((product) => <MainProductCard key={product.title} prd={product} />)}

                <TechnicalSupport />
            </View>
        </ScrollView>

    )
}