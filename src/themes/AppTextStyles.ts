import { StyleSheet } from "react-native";
import { appFontSizes } from "./appFontSizes";
import AppColors from "./colors";

export const appTextStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
  },
  lifeStore: {
    fontSize: appFontSizes.size10,
    fontWeight: "600",
    color: AppColors.onPrimaryFixed,
  },
  signInSubTitle: {
    fontSize: appFontSizes.size13,
    fontWeight: "600",
    textAlign: "center",
    color: AppColors.onSurfaceVariant,
  },
  titleTextStyle: {
    fontSize: appFontSizes.size12,
    fontWeight: "500",
    color: AppColors.onSurfaceVariant,
  },
  buttonStyle: {
    fontSize: appFontSizes.size14,
    fontWeight: "600",
    color: AppColors.white,
  },
  textButton: {
    fontSize: appFontSizes.size14,
    fontWeight: "500",
    color: AppColors.primary,
  },
  fingerPrint: {
    fontSize: appFontSizes.size12,
    fontWeight: "500",
    color: AppColors.textPrimary,
  },
  continueWith: {
    fontSize: appFontSizes.size10,
    fontWeight: "600",
    color: AppColors.outline,
  },
  passwordHint: {
    fontSize: 11,
    fontWeight: "400",
    color: AppColors.onSurfaceVariant,
  },
  subTitle: {
    fontSize: appFontSizes.size13,
    fontWeight: "400",
    textAlign: "center",
    color: AppColors.textPrimary,
  },
  categoryStyle: {
    fontSize: appFontSizes.size12,
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
});

export const AppTextStyles = appTextStyles;
