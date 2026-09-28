import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import AppColors from "../../../themes/colors";

import { BlurView } from "expo-blur";
import AppText from "../../../components/AppText";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { appSizes } from "../../../themes";
import {
  clothingUrl,
  ImageBackgroundContainer,
} from "../../../components/ImageContainer";
import TextButton from "../../../components/TextButton";
import { LinearGradient } from "expo-linear-gradient";
import { useScreenSize } from "../../../helpers/ScreenDimension";

interface ItemsCountProps extends ViewProps {}
export const ItemsCount = (props: ItemsCountProps) => {
  return (
    <View style={styles.itemsCount}>
      <BlurView
        intensity={80}
        {...props}
        tint="light"
        style={StyleSheet.absoluteFill}
      />

      <AppText style={styles.itemsText}>4,200+ Items</AppText>
    </View>
  );
};

interface BlurProps {
  containerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export const BlurBackGround = (props: BlurProps) => {
  return (
    <View style={[styles.itemsCount, props.containerStyle]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />

      {props.children}
    </View>
  );
};

export const ArrowCard = () => {
  return (
    <BlurBackGround containerStyle={styles.arrowContainer}>
      <Ionicons name="arrow-forward-outline" color={AppColors.white} />
    </BlurBackGround>
  );
};

export const CategorySecondCard = () => {
  const { screenWidth, screenHeight } = useScreenSize();
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <ImageBackgroundContainer
        netwrokImage={clothingUrl.clothingUrl}
        imageStyle={{
          width: "100%",
          height: screenHeight * 0.2,
          borderRadius: 12,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0)"]}
          start={{ x: 0.001, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            borderRadius: 12,
          }}
        />
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={{ alignItems: "flex-start" }}>
                <ItemsCount style={{ width: 1 }} />
              </View>
            </View>

            <ArrowCard />
          </View>
          <View style={{ gap: 4 }}>
            <AppText
              style={{
                fontSize: 10,
                fontWeight: "600",
                color: AppColors.tertiaryFixed,
              }}
            >
              WARDROBE
            </AppText>
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AppColors.surface,
              }}
            >
              Men
            </AppText>
            <TextButton>
              <AppText
                style={{
                  fontSize: 11,
                  fontWeight: "500",
                  color: `${AppColors.surface}80`,
                }}
              >
                Show Now <Ionicons name="arrow-forward-outline" />
              </AppText>
            </TextButton>
          </View>
        </View>
      </ImageBackgroundContainer>
    </View>
  );
};

export const CategoryThirdCard = () => {
  const { screenWidth, screenHeight } = useScreenSize();
  return (
    <View
      style={{
        gap: 4,
        position: "relative",
        alignItems: "flex-start",
      }}
    >
      <ImageBackgroundContainer
        netwrokImage={clothingUrl.clothingUrl}
        imageStyle={{
          width: screenWidth * 0.44,
          height: screenHeight * 0.25,
          borderRadius: 12,
        }}
      >
        <LinearGradient
          colors={[
            `${AppColors.black}90`,
            `${AppColors.black}25`,
            `${AppColors.black}00`,
          ]}
          start={{ x: 0.5, y: 0.999 }}
          end={{ x: 0.5, y: 0.001 }}
          locations={[0, 0.5, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            borderRadius: 12,
          }}
        />
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <ItemsCount style={{ width: 1 }} />
            </View>
          </View>
          <View style={{ gap: 4 }}>
            <AppText
              style={{
                fontSize: 10,
                fontWeight: "600",
                color: AppColors.tertiaryFixed,
              }}
            >
              WARDROBE
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: AppColors.surface,
              }}
            >
              Footwear & Sneakers
            </AppText>
            <TextButton>
              <AppText
                style={{
                  fontSize: 11,
                  fontWeight: "500",
                  color: `${AppColors.surface}`,
                  opacity: 0.9,
                }}
              >
                Explore <Ionicons name="arrow-forward-outline" />
              </AppText>
            </TextButton>
          </View>
        </View>
      </ImageBackgroundContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsCount: {
    borderRadius: 6,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    borderRadius: appSizes.borderRadiusRound,
  },

  itemsText: {
    fontSize: 10,
    fontWeight: "500",
    color: "white",
    zIndex: 1,
  },
});
