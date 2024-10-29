import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import LayoutScreen from "./src/screens/LayoutScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Test from "./src/screens/Test";
import CartScreen from "./src/screens/CartScreen";
import MealDetails from "./src/screens/MealDetails";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Layout"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Layout" component={LayoutScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="MealDetails" component={MealDetails} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </SafeAreaView>

      <StatusBar />
    </NavigationContainer>
  );
}
