import React, { useEffect } from 'react'
import { Text } from 'react-native';

export default function LoginScreen(props) {

  useEffect(() => {
    const t = setTimeout(() => {
      props.navigation.navigate('Layout');
    }, 3000);

    return () => clearTimeout(t);
  }, [])

  return (
    <Text>LoginScreen</Text>
  )
}
