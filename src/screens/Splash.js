import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

export default function SplashScreen() {
  const rotateAnim = useRef(new Animated.Value(0)).current;  
  const scaleAnim = useRef(new Animated.Value(1)).current;  

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 750,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 750,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashChild}>
        <Animated.Image
          source={require('../assets/IconBg.png')}
          style={[styles.iconBg, { transform: [{ rotate }] }]}  // تطبيق التدوير
        />
        <Animated.Image
          source={require('../assets/IconNoBg.png')}
          style={[styles.iconNoBg, { transform: [{ scale: scaleAnim }] }]}  // تطبيق التكبير
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  splashChild: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
  },
  iconBg: {
    width: '100%',
    height: '100%',
  },
  iconNoBg: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '50%',
    height: '50%',
  },
});
