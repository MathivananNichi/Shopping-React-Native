import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import ProductDetailScreen from "../screens/productDetail/ProductDetailScreen";
import { AppRouteName } from "./routes";
import { HomeStackParamList } from "./types";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name={AppRouteName.productDetail}
        component={ProductDetailScreen}
        options={{ presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
