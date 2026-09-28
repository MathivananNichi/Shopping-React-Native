import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppColors from "../themes/colors";
import { appSizes } from "../themes";
import { Ionicons } from "@expo/vector-icons";
import { Tick } from "../assets/svg/tick";
import { useState } from "react";
interface AppCheckBoxProps {
  onPress: (checked: boolean) => void;
  initialValue?: boolean;
  size?: number;
}

export default function AppCheckBox({
  onPress,
  initialValue = false,
  size = 12,
}: AppCheckBoxProps) {
  const [isChecked, updateCheck] = useState(initialValue);
  function updateCheckBox() {
    const newValue = !isChecked;
    updateCheck(newValue);
    onPress(newValue);
  }

  return (
    <View
      style={[
        styles.checkBoxContainer,
        { width: size + 4, height: size + 4 },
        { backgroundColor: isChecked ? AppColors.primary : AppColors.white },
      ]}
    >
      <TouchableOpacity
        onPress={updateCheckBox}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
        }}
      >
        <Tick
          width={12}
          height={12}
          opacity={isChecked ? 1 : 0}
          color={AppColors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    borderColor: AppColors.primary,
    borderRadius: 1,
    borderWidth: 1.5,
  },
  checkBoxUnCheckedContainer: {
    backgroundColor: AppColors.white,
  },
  checkBoxCheckedContainer: {
    borderColor: AppColors.primary,
  },
  // touchableContainer: {
  //   padding: 2,
  // },
});
