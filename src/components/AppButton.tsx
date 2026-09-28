import React, { ReactNode, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  StyleProp,
  TextStyle,
} from "react-native";
import AppColors from "../themes/colors";
import { AppPadding } from "../themes/appPadding";
import { appSizes, AppTextStyles } from "../themes";

interface AppButtonInterface extends TouchableOpacityProps {
  title: string;
  suffix?: ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export default function AppButton({
  title,
  onPress,
  style,
  isLoading = false,
  disabled = false,
  suffix,
  textStyle,
  ...rest
}: AppButtonInterface) {
  return (
    <TouchableOpacity
      {...rest}
      disabled={false}
      style={[
        styles.buttonContainer,
        (disabled || isLoading) && styles.disabledButton,
        style,
      ]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      {isLoading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator
            color={AppColors.white}
            size="small"
            style={styles.indicator}
          />
        </View>
      ) : (
        <>
          <Text style={[AppTextStyles.buttonStyle, textStyle]}>{title}</Text>
          {suffix && suffix}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: AppColors.primaryContainer,
    padding: AppPadding.padding16,
    borderRadius: appSizes.borderRadiusLg,
    alignItems: "center",
    width: "100%",

    flexDirection: "row",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.8,
  },
  indicatorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 20, // Match line height of button text to prevent layout shift
  },
  indicator: {
    transform: [{ scale: 1.75 }], // Increases spinner visual thickness & size
    margin: 0,
    padding: 0,
  },
});
