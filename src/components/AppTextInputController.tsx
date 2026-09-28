import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
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
import AppTextInput from "./AppTextInput";

interface AppTextInputProps<T extends FieldValues> extends TextInputProps {
  title: string;
  placeHolder?: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export default function AppTextInputController<T extends FieldValues>({
  title,
  placeHolder,
  prefix,
  suffix,
  secureTextEntry,
  rules,
  control,
  name,
  ...rest
}: AppTextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[{ width: "100%", gap: AppGap.gap4 }]}>
          <AppTextInput
            value={value}
            title={title}
            borderStyle={error && styles.errorInput}
            prefix={prefix}
            suffix={suffix}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[styles.textStyle]}
            {...rest}
            placeholder={placeHolder}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <AppText style={styles.errorstyle}>{error.message}</AppText>
          )}
        </View>
      )}
    />
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
