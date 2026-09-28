import { useEffect } from "react";
import AppView from "../../components/AppView";
import { useNavigation } from "@react-navigation/native";
import { AppStackName } from "../../navigation/routes";
import { RootStackNavProp } from "../../navigation/types";

export default function SplashScreen() {
  const navigation = useNavigation<RootStackNavProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(AppStackName.auth);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <AppView />;
}
