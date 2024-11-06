import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/utils/AuthContext ";
import { CartProvider } from "./src/utils/CartContext";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./src/screens/Splash";
import RegisterScreen from "./src/screens/Register";
import LoginScreen from "./src/screens/Login";
import BottomLayout from "./src/components/BottomLayout";
import CartScreen from "./src/screens/Cart";
import MealDetails from "./src/screens/MealDetails";
import Settings from "./src/screens/Settings";
import OrderHistory from "./src/screens/OrderHistory";
import { StatusBar } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, }}>
              <Stack.Screen name="BottomLayout" component={BottomLayout} />
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="MealDetails" component={MealDetails} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="OrderHistory" component={OrderHistory} />
            </Stack.Navigator>
          </SafeAreaView>
          <StatusBar />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
