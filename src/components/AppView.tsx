import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import AppColors from "../themes/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppViewProps extends ViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function AppView({ children, style, ...rest }: AppViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...rest}
      style={[styles.scaffoldContainer, { paddingTop: insets.top }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scaffoldContainer: {
    backgroundColor: AppColors.background,
    flex: 1,
  },
});
