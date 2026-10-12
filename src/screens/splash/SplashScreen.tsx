import { useEffect } from "react";
import AppView from "../../components/AppView";
import { useNavigation } from "@react-navigation/native";
import { AppStackName } from "../../navigation/routes";
import { RootStackNavProp } from "../../navigation/types";
import { useAppSelector } from "../../store/hooks";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../auth/store/authSlice";

export default function SplashScreen() {
  const navigation = useNavigation<RootStackNavProp>();
  const isToken = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectAccessToken);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isToken) {
        console.log("wwwwwwwwwwww", `${token}`);
        // sdsd
        navigation.replace(AppStackName.mainBottom);
      } else {
        navigation.replace(AppStackName.auth);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, token]);

  return <AppView />;
}
