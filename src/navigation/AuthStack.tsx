import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/views/LoginScreen";
import SignUpScreen from "../screens/auth/views/SignUpScreen";
import { AppRouteName } from "./routes";
import { AuthStackParamList } from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRouteName.loginScreen} component={LoginScreen} />
      <Stack.Screen name={AppRouteName.signupScreen} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
