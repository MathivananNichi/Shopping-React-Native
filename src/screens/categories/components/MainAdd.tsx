import { View, StyleSheet } from "react-native";
import AppColors from "../../../themes/colors";
import { appSizes } from "../../../themes";
import AppText from "../../../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../components/AppButton";
import { useLocalization } from "../../../hooks/translation_hooks";
import { useScreenSize } from "../../../helpers/ScreenDimension";
import { ContainerStyle } from "../../../themes/containerStyle";

interface MainAddProps {}

export default function MainAdd(props: MainAddProps) {
  const t = useLocalization();
  const { screenWidth, screenHeight } = useScreenSize();
  return (
    <View
      style={[
        styles.browse,
        { height: screenHeight * 0.2 },
        ContainerStyle.shadow,
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.curated}>
          <Ionicons name="sparkles-outline" color={AppColors.surface} />
          <AppText
            style={{
              color: AppColors.surface,
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            {"CURATED COLLECTIONS".toLocaleUpperCase()}
          </AppText>
        </View>
        <AppText
          style={{
            fontSize: 18,
            color: AppColors.white,
            fontWeight: "700",
          }}
        >
          Spring Editorial '25
        </AppText>
        <AppText
          style={{
            fontSize: 11,
            fontWeight: "500",
            color: `${AppColors.surface}80`,
          }}
        >
          Explore over 15,000 newly categorized runway aesthetics.
        </AppText>
      </View>
      <View>
        <AppButton
          title={t.BROWSE}
          suffix={<Ionicons name="arrow-forward-outline" />}
          textStyle={{ color: AppColors.textPrimary }}
          style={{
            width: 100,
            gap: 2,
            backgroundColor: AppColors.white,
            paddingVertical: 7,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  browse: {
    marginVertical: 16,
    backgroundColor: AppColors.primaryContainer,
    width: "100%",
    padding: 16,

    borderRadius: appSizes.borderRadiusXl,
  },
  curated: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: appSizes.borderRadiusRound,
    backgroundColor: `${AppColors.white}20`,
  },
});
