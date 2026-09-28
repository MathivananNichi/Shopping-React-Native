import {
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";
import React from "react";
import { AppTextStyles } from "../themes";

interface TouchableOpacityViewProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

export default function TouchableOpacityView({
  children,
  style,
  ...rest
}: TouchableOpacityViewProps) {
  return (
    <TouchableOpacity {...rest} style={[style]} activeOpacity={0.3}>
      {children}
    </TouchableOpacity>
  );
}
