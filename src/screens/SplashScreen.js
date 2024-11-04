import React, { useEffect } from 'react'
import { Text } from 'react-native';

export default function SplashScreen(props) {

    useEffect(() => {
        const t = setTimeout(() => {
            props.navigation.navigate('Register');
        }, 3000);

        return () => clearTimeout(t);
    }, [])

    return (
        <Text>SplashScreen</Text>
    )
}
