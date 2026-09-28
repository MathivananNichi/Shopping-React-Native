import { FC, ReactNode } from "react";
import { StyleSheet } from "react-native";
import TouchableOpacityView from "./AppTouchable";
import AppColors from "../themes/colors";

interface SignInWithCardProps {
  icon: ReactNode;
  onPress?: () => void;
}

export const SignInWithCard: FC<SignInWithCardProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacityView style={styles.signInWithCard} onPress={onPress}>
      {icon}
    </TouchableOpacityView>
  );
};

const styles = StyleSheet.create({
  signInWithCard: {
    padding: 12,
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.white,
    elevation: 1,
  },
});