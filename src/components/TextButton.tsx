import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import AppText from "./AppText";
import React from "react";
import { AppTextStyles } from "../themes";
import TouchableOpacityView from "./AppTouchable";

interface TextButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function TextButton({
  children,
  textStyle,
  onPress,
  style,
  title,
  ...rest
}: TextButtonProps) {
  return (
    <>
      <TouchableOpacityView {...rest} style={style} onPress={onPress}>
        {children || (
          <AppText style={[AppTextStyles.textButton, textStyle]}>
            {title}
          </AppText>
        )}
      </TouchableOpacityView>
    </>
  );
}
