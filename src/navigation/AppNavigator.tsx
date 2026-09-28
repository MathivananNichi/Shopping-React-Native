import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import SplashStack from "./SplashStack";
import { AppRouteName, AppStackName } from "./routes";
import { RootStackParamList } from "./types";
import MainBottomTabStack from "./MainAppBottomTabs";
import ProductDetailScreen from "../screens/productDetail/ProductDetailScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import MyOrdersScreen from "../screens/orders/MyOrdersScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AppStackName.splash}
    >
      <Stack.Screen name={AppStackName.splash} component={SplashStack} />
      <Stack.Screen name={AppStackName.auth} component={AuthStack} />
      <Stack.Screen
        name={AppStackName.mainBottom}
        component={MainBottomTabStack}
      />
      <Stack.Screen
        name={AppRouteName.productDetail}
        component={ProductDetailScreen}
        options={{ headerShown: false, presentation: "card" }}
      />
      <Stack.Screen
        name={AppRouteName.checkout}
        component={CheckoutScreen}
        options={{ headerShown: false, presentation: "card" }}
      />
      <Stack.Screen
        name={AppRouteName.myOrders}
        component={MyOrdersScreen}
        options={{ headerShown: false, presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
