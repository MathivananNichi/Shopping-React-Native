import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";
import AppColors from "../themes/colors";
import { AppGap, appSizes, AppTextStyles } from "../themes";
import { AppPadding } from "../themes/appPadding";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface AppTextInputProps<T extends FieldValues> extends TextInputProps {
  title?: string;
  placeHolder?: string;
  value?: string;
  borderStyle?: StyleProp<ViewStyle>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export default function AppTextInput<T extends FieldValues>({
  title,
  placeHolder,
  prefix,
  suffix,
  secureTextEntry,
  borderStyle: borderStyle,
  ...rest
}: AppTextInputProps<T>) {
  return (
    <View style={[{ width: "100%", gap: AppGap.gap4 }]}>
      {title != null ? (
        <AppText style={AppTextStyles.titleTextStyle}>{title}</AppText>
      ) : undefined}
      <View style={[styles.textInputContainer, borderStyle]}>
        {prefix}
        <TextInput
          style={[styles.textStyle]}
          {...rest}
          placeholder={placeHolder}
          secureTextEntry={secureTextEntry}
        />
        {suffix}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    gap: AppGap.gap4,
    paddingHorizontal: AppPadding.padding8,
    borderRadius: appSizes.borderRadiusMd,
    elevation: 8,
    shadowRadius: appSizes.borderRadiusMd,
    backgroundColor: AppColors.white,
    alignItems: "center",
  },
  textStyle: {
    flex: 1,
    // Entered text styling
    color: AppColors.black,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto",
    alignContent: "center",
  },
  errorInput: {
    borderColor: AppColors.onErrorContainer,
    borderWidth: 1,
    borderRadius: appSizes.borderRadiusMd,
  },
  errorstyle: {
    fontSize: 12,
    color: AppColors.onErrorContainer,
  },
});
