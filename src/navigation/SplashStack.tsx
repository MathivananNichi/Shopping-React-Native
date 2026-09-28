import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splash/SplashScreen";
import { AppRouteName } from "./routes";
import { SplashStackParamList } from "./types";

const Stack = createStackNavigator<SplashStackParamList>();

export default function SplashStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AppRouteName.splashScreen}
    >
      <Stack.Screen name={AppRouteName.splashScreen} component={SplashScreen} />
    </Stack.Navigator>
  );
}
