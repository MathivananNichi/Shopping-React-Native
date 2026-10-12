import React from "react";
import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { useScreenSize } from "../../helpers/ScreenDimension";
import { VerticalSpacer } from "../../components/Spacer";
import { clothingUrl, ImageContainer } from "../../components/ImageContainer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, ProductData } from "../../navigation/types";
import { AppRouteName } from "../../navigation/routes";
import { Product } from "./api/product.dto";
import { mapProductToProductData } from "./viewModel/homeViewModel";

type HomeNav = StackNavigationProp<RootStackParamList>;

export interface FlashDealsCardProps {
  product?: Product | ProductData;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FlashDealsCard = ({
  product,
  onPress,
  style,
}: FlashDealsCardProps) => {
  const { screenWidth } = useScreenSize();
  const navigation = useNavigation<HomeNav>();

  const isRawProduct = product && "_id" in product;
  const productData: ProductData | undefined = product
    ? isRawProduct
      ? mapProductToProductData(product as Product)
      : (product as ProductData)
    : undefined;

  const brand = productData?.brand ?? "Nike";
  const name = productData?.name ?? "Air Max 270";
  const price = productData?.price ?? 4499;
  const originalPrice = productData?.originalPrice ?? 6999;
  const discount = productData?.discount ?? 36;
  const imageUrl = productData?.image ?? clothingUrl.clothingUrl;

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (productData) {
      navigation.navigate(AppRouteName.productDetail, { product: productData });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      style={[styles.cardContainer, style]}
    >
      <View style={styles.imageWrapper}>
        <ImageContainer
          netwrokImage={imageUrl}
          imageStyle={{
            width: screenWidth * 0.32,
            height: 100,
            borderRadius: 12,
          }}
        />
        <View style={styles.heartWrapper}>
          <Ionicons name="heart-outline" size={16} color={AppColors.textSecondary} />
        </View>
      </View>
      <AppText style={styles.brandText} numberOfLines={1}>
        {brand}
      </AppText>
      <AppText style={styles.nameText} numberOfLines={1}>
        {name}
      </AppText>
      <AppText style={styles.priceText}>
        ₹{price.toLocaleString("en-IN")}{" "}
        {originalPrice > price && (
          <AppText style={styles.strikePrice}>
            ₹{originalPrice.toLocaleString("en-IN")}
          </AppText>
        )}
      </AppText>
      {discount > 0 && (
        <AppText style={styles.discountText}>{discount}% OFF</AppText>
      )}
    </TouchableOpacity>
  );
};

export interface RecomendedForYouProps {
  product?: Product | ProductData;
  imageStyles?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const RecomendedForYou = (props: RecomendedForYouProps) => {
  const { screenWidth } = useScreenSize();
  const navigation = useNavigation<HomeNav>();

  const isRawProduct = props.product && "_id" in props.product;
  const productData: ProductData | undefined = props.product
    ? isRawProduct
      ? mapProductToProductData(props.product as Product)
      : (props.product as ProductData)
    : undefined;

  const brand = productData?.brand ?? "Nike";
  const name = productData?.name ?? "Air Max 270";
  const price = productData?.price ?? 4499;
  const originalPrice = productData?.originalPrice ?? 6999;
  const imageUrl = productData?.image ?? clothingUrl.clothingUrl;

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
      return;
    }
    if (productData) {
      navigation.navigate(AppRouteName.productDetail, { product: productData });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.cardContainer, props.style]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <View style={styles.imageWrapper}>
        <ImageContainer
          netwrokImage={imageUrl}
          imageStyle={[
            {
              width: screenWidth * 0.32,
              height: 100,
              borderRadius: 12,
            },
            props.imageStyles,
          ]}
        />
        <View style={styles.heartWrapper}>
          <Ionicons name="heart-outline" size={16} color={AppColors.textSecondary} />
        </View>
      </View>
      <VerticalSpacer gap={8} />
      <AppText style={styles.brandText} numberOfLines={1}>
        {brand}
      </AppText>
      <AppText style={styles.nameText} numberOfLines={1}>
        {name}
      </AppText>
      <AppText style={styles.priceText}>
        ₹{price.toLocaleString("en-IN")}{" "}
        {originalPrice > price && (
          <AppText style={styles.strikePrice}>
            ₹{originalPrice.toLocaleString("en-IN")}
          </AppText>
        )}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
  },
  heartWrapper: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontWeight: "600",
    color: AppColors.outline,
    fontSize: 10,
    marginTop: 4,
  },
  nameText: {
    fontWeight: "600",
    color: AppColors.textPrimary,
    fontSize: 13,
    marginTop: 2,
  },
  priceText: {
    fontWeight: "700",
    color: AppColors.textPrimary,
    fontSize: 14,
    marginTop: 2,
  },
  strikePrice: {
    fontWeight: "400",
    color: AppColors.outline,
    textDecorationLine: "line-through",
    fontSize: 11,
  },
  discountText: {
    fontWeight: "700",
    color: AppColors.discount,
    fontSize: 12,
    marginTop: 2,
  },
});
