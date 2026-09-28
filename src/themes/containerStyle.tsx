import { StyleSheet } from "react-native";
import { appSizes } from "./appSizes";
import AppColors from "./colors";

export const ContainerStyle = StyleSheet.create({
  categoryContainer: {
    width: appSizes.size56,
    height: appSizes.size56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  shadow: {
    // Android
    elevation: 1,

    // iOS
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categortSelected: {
    backgroundColor: AppColors.onBackground,
    borderRadius: appSizes.borderRadiusXl,
  },
  categortUnSelected: {
    backgroundColor: AppColors.white,
    borderRadius: appSizes.borderRadiusXl,
  },
});
