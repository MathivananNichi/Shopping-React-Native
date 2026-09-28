import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import AppColors from "../themes/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "./AppText";
import { AppTextStyles } from "../themes";
import { appMargin } from "../themes/appMargin";
import { ReactNode } from "react";

interface TextWithDividerProps {
  title: string;
}

export default function TextWithDivider({ title }: TextWithDividerProps) {
  return (
    <>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <AppText style={AppTextStyles.continueWith}>{title}</AppText>
        <View style={styles.divider} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    gap: 12,
    flex: 1,
    marginVertical: appMargin.margin16,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    backgroundColor: AppColors.surfaceVariant,
    height: 1,
  },
});
