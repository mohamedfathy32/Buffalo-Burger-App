import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(0);
    const updateCart = async () => {
        const productsStorage = await AsyncStorage.getItem('cart');
        let productsArray = productsStorage ? JSON.parse(productsStorage) : [];
        setCart(productsArray.length);
    };
    updateCart();
    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};