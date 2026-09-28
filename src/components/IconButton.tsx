import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
} from "react-native";
import AppText from "./AppText";
import React, { ReactNode } from "react";
import { AppTextStyles } from "../themes";
import TouchableOpacityView from "./AppTouchable";

interface TextButtonProps extends TouchableOpacityProps {
  icon: ReactNode;
  style?: StyleProp<ViewProps>;
  onPress?: () => void;
}

export default function IconButton({
  icon,
  style,
  onPress,
  ...rest
}: TextButtonProps) {
  return (
    <>
      <TouchableOpacityView
        {...rest}
        onPress={onPress}
        style={[styles.container, style]}
      >
        {icon}
      </TouchableOpacityView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
