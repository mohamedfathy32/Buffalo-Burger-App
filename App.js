import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import LayoutScreen from "./src/screens/LayoutScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import Settings from "./src/screens/Settings";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Test from "./src/screens/Test";
import CartScreen from "./src/screens/CartScreen";
import MealDetails from "./src/screens/MealDetails";
import { AuthProvider } from "./AuthContext ";
import { NotificationProvider } from "./src/utils/context";
import RequestsScreen from "./src/screens/RequestsScreen";
import AddressScreen from "./src/screens/AddressScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator
              initialRouteName="Login"
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
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Requests" component={RequestsScreen} />
              <Stack.Screen name="Address" component={AddressScreen} />
              <Stack.Screen name="Review" component={ReviewScreen} />
              <Stack.Screen name="Test" component={Test} />
            </Stack.Navigator>
          </SafeAreaView>

          <StatusBar />
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}
