import { FC } from "react";
import { View } from "react-native";

interface SpacerProps {
  gap?: number;
}
export const HorizontalSpacer: FC<SpacerProps> = ({ gap }) => {
  return <View style={{ width: gap }}></View>;
};

export const VerticalSpacer: FC<SpacerProps> = ({ gap }) => {
  return <View style={{ height: gap }}></View>;
};
