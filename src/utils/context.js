import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState(0);

    const updateNotifications = async () => {

        const productsStorage = await AsyncStorage.getItem('cart');
        let productsArray = productsStorage ? JSON.parse(productsStorage) : [];
        setNotifications(productsArray.length);

    };

    updateNotifications();

    return (
        <NotificationContext.Provider value={{ notifications, updateNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
