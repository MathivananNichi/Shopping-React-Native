import { ImageStyle, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { useScreenSize } from "../../helpers/ScreenDimension";
import HearCard from "../../components/HearCard";
import { VerticalSpacer } from "../../components/Spacer";
import { clothingUrl, ImageContainer } from "../../components/ImageContainer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, ProductData } from "../../navigation/types";
import { AppRouteName } from "../../navigation/routes";

type HomeNav = StackNavigationProp<RootStackParamList>;

const SAMPLE_PRODUCT: ProductData = {
  id: "p1",
  brand: "Nike",
  name: "Air Max 270",
  category: "Men's Shoes",
  price: 4499,
  originalPrice: 6999,
  discount: 36,
  rating: 4.6,
  reviewCount: 13146,
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  ],
  highlights: [
    "Breathable mesh upper for lightweight air flow",
    "Large volume Max Air unit provides responsive cushioning",
    "Durable solid rubber outsole for reliable grip & traction",
    "Foam midsole for lightweight cushioning and support",
  ],
  sizes: [6, 7, 8, 9, 10, 11],
};

interface FlashDealsCardProps {}

export const FlashDealsCard = (props: FlashDealsCardProps) => {
  const { screenWidth } = useScreenSize();
  const navigation = useNavigation<HomeNav>();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate(AppRouteName.productDetail, { product: SAMPLE_PRODUCT })
      }
      style={{
        position: "relative",
        justifyContent: "center",
      }}
    >
      <ImageContainer
        netwrokImage={clothingUrl.clothingUrl}
        imageStyle={{
          width: screenWidth * 0.3,
          height: 100,
          borderRadius: 12,
        }}
      />
      <HearCard
        style={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      />
      <AppText
        style={{
          fontWeight: "600",
          color: AppColors.outline,
          fontSize: 10,
        }}
      >
        Niek
      </AppText>
      <AppText
        style={{
          fontWeight: "600",
          color: AppColors.textPrimary,
          fontSize: 14,
        }}
      >
        Air Max 270
      </AppText>
      <AppText
        style={{
          fontWeight: "700",
          color: AppColors.textPrimary,
          fontSize: 16,
        }}
      >
        ₹4,499{" "}
        <AppText
          style={{
            fontWeight: "400",
            color: AppColors.outline,
            textDecorationLine: "line-through",
            fontSize: 11,
          }}
        >
          ₹6,999
        </AppText>
      </AppText>
      <AppText
        style={{
          fontWeight: "600",
          color: AppColors.error,
          fontSize: 14,
        }}
      >
        36% OFF
      </AppText>
    </TouchableOpacity>
  );
};
interface RecomendedForYouProps {
  imageStyles?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
}

export const RecomendedForYou = (props: RecomendedForYouProps) => {
  const { screenWidth } = useScreenSize();
  const navigation = useNavigation<HomeNav>();
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate(AppRouteName.productDetail, { product: SAMPLE_PRODUCT })
      }
    >
      <ImageContainer
        netwrokImage={clothingUrl.clothingUrl}
        imageStyle={[
          {
            width: screenWidth * 0.3,
            height: 100,
            borderRadius: 12,
          },
          props.imageStyles,
        ]}
      />
      <HearCard
        style={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      />
      <VerticalSpacer gap={12} />
      <AppText
        style={{
          fontWeight: "600",
          color: AppColors.outline,
          fontSize: 10,
        }}
      >
        Niek
      </AppText>
      <AppText
        style={{
          fontWeight: "600",
          color: AppColors.textPrimary,
          fontSize: 14,
        }}
      >
        Air Max 270
      </AppText>
      <AppText
        style={{
          fontWeight: "700",
          color: AppColors.textPrimary,
          fontSize: 16,
        }}
      >
        ₹4,499{" "}
        <AppText
          style={{
            fontWeight: "400",
            color: AppColors.outline,
            textDecorationLine: "line-through",
            fontSize: 11,
          }}
        >
          ₹6,999
        </AppText>
      </AppText>
    </TouchableOpacity>
  );
};
