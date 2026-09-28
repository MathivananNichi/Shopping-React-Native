import { Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';
interface ScreenDimension {
  screenWidth: number;
  screenHeight: number;
}

export const useScreenSize = (): ScreenDimension => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  return {
    screenWidth,
    screenHeight,
  };
};
