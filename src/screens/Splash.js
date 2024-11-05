import { useEffect } from 'react'
import { Text } from 'react-native';

export default function SplashScreen(props) {

    useEffect(() => {
        const t = setTimeout(() => {
            props.navigation.navigate('Register');
        }, 200);

        return () => clearTimeout(t);
    }, [])

    return (
        <Text>SplashScreen</Text>
    )
}