import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  TextProps,
  StyleProp,
} from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: "bold" | "medium";
}

const AppText: FC<AppTextProps> = ({
  children,
  style,
  variant = "medium",
  ...rest
}) => {
  return (
    <Text {...rest} style={[styles[variant], style]}>
      {children}
    </Text>
  );
};
export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontSize: 16,
    fontWeight: "700",
  },
  medium: {
    fontSize: 16,
  },
});
