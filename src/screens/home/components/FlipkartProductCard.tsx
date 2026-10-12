import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../components/AppText";
import AppColors from "../../../themes/colors";
import { Product } from "../api/product.dto";
import { getProductImage } from "../viewModel/homeViewModel";

export interface FlipkartProductCardProps {
  product: Product;
  onPress: () => void;
  isWishlisted?: boolean;
  onWishlistPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FlipkartProductCard = memo(
  ({
    product,
    onPress,
    isWishlisted = false,
    onWishlistPress,
    style,
  }: FlipkartProductCardProps) => {
    const brandName =
      typeof product.brandId === "object"
        ? product.brandId?.name || "GENERIC"
        : "BRAND";

    const firstVariant = product.variants?.[0];
    const effectivePrice =
      firstVariant?.effectivePrice ?? product.minVariantPrice ?? 499;
    const actualPrice = firstVariant?.actualPrice ?? effectivePrice * 1.15;
    const discount =
      firstVariant?.discountPercentage ??
      Math.round(((actualPrice - effectivePrice) / actualPrice) * 100);

    const imageUrl = getProductImage(product);

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={[styles.card, style]}
      >
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Wishlist Button */}
          {onWishlistPress && (
            <TouchableOpacity
              style={styles.heartButton}
              activeOpacity={0.7}
              onPress={onWishlistPress}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={18}
                color={isWishlisted ? AppColors.error : AppColors.textSecondary}
              />
            </TouchableOpacity>
          )}

          {/* Discount Badge */}
          {discount >= 5 && (
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>{discount}% OFF</AppText>
            </View>
          )}
        </View>

        {/* Content Details */}
        <View style={styles.content}>
          {/* Brand */}
          <AppText style={styles.brand} numberOfLines={1}>
            {brandName.toUpperCase()}
          </AppText>

          {/* Title */}
          <AppText style={styles.title} numberOfLines={2}>
            {product.name}
          </AppText>

          {/* Rating Row */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingPill}>
              <AppText style={styles.ratingText}>4.3</AppText>
              <Ionicons name="star" size={10} color={AppColors.white} />
            </View>
            <AppText style={styles.ratingCount}>(1.2k)</AppText>
            <View style={styles.assuredBadge}>
              <Ionicons
                name="checkmark-circle"
                size={12}
                color={AppColors.primary}
              />
              <AppText style={styles.assuredText}>Assured</AppText>
            </View>
          </View>

          {/* Price Row */}
          <View style={styles.priceRow}>
            <AppText style={styles.effectivePrice}>
              ₹{Math.round(effectivePrice).toLocaleString("en-IN")}
            </AppText>
            {actualPrice > effectivePrice && (
              <AppText style={styles.actualPrice}>
                ₹{Math.round(actualPrice).toLocaleString("en-IN")}
              </AppText>
            )}
            {discount > 0 && (
              <AppText style={styles.discountText}>{discount}% off</AppText>
            )}
          </View>

          {/* Tag */}
          <View style={styles.tagRow}>
            <AppText style={styles.tagText}>Free delivery</AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export interface FlipkartFlashDealCardProps {
  product: Product;
  onPress: () => void;
  isWishlisted?: boolean;
  onWishlistPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FlipkartFlashDealCard = memo(
  ({
    product,
    onPress,
    isWishlisted = false,
    onWishlistPress,
    style,
  }: FlipkartFlashDealCardProps) => {
    const brandName =
      typeof product.brandId === "object"
        ? product.brandId?.name || "BRAND"
        : "BRAND";

    const firstVariant = product.variants?.[0];
    const effectivePrice =
      firstVariant?.effectivePrice ?? product.minVariantPrice ?? 499;
    const actualPrice = firstVariant?.actualPrice ?? effectivePrice * 1.15;
    const discount =
      firstVariant?.discountPercentage ??
      Math.round(((actualPrice - effectivePrice) / actualPrice) * 100);

    const imageUrl = getProductImage(product);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.flashCard, style]}
      >
        <View style={styles.flashImageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.flashImage}
            resizeMode="cover"
          />
          {discount > 0 && (
            <View style={styles.flashDiscountBadge}>
              <AppText style={styles.flashDiscountText}>{discount}% OFF</AppText>
            </View>
          )}
          {onWishlistPress && (
            <TouchableOpacity
              style={styles.flashHeartButton}
              activeOpacity={0.7}
              onPress={onWishlistPress}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={14}
                color={isWishlisted ? AppColors.error : AppColors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
        <AppText style={styles.flashBrand} numberOfLines={1}>
          {brandName.toUpperCase()}
        </AppText>
        <AppText style={styles.flashTitle} numberOfLines={1}>
          {product.name}
        </AppText>
        <View style={styles.flashPriceRow}>
          <AppText style={styles.flashPrice}>
            ₹{Math.round(effectivePrice).toLocaleString("en-IN")}
          </AppText>
          {actualPrice > effectivePrice && (
            <AppText style={styles.flashOldPrice}>
              ₹{Math.round(actualPrice).toLocaleString("en-IN")}
            </AppText>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  /* Main Grid Card */
  card: {
    flex: 1,
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: AppColors.surfaceContainerHigh,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 4,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 160,
    backgroundColor: AppColors.surfaceContainerLow,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: AppColors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: AppColors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  content: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  brand: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.outline,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    color: AppColors.textPrimary,
    lineHeight: 18,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.success,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    gap: 2,
  },
  ratingText: {
    color: AppColors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  ratingCount: {
    fontSize: 10,
    color: AppColors.textSecondary,
  },
  assuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    gap: 2,
  },
  assuredText: {
    fontSize: 10,
    fontWeight: "700",
    color: AppColors.primary,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 4,
  },
  effectivePrice: {
    fontSize: 15,
    fontWeight: "800",
    color: AppColors.textPrimary,
  },
  actualPrice: {
    fontSize: 11,
    fontWeight: "400",
    color: AppColors.outline,
    textDecorationLine: "line-through",
  },
  discountText: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.success,
  },
  tagRow: {
    marginTop: 2,
  },
  tagText: {
    fontSize: 10,
    color: AppColors.success,
    fontWeight: "600",
  },

  /* Horizontal Flash Deal Card */
  flashCard: {
    width: 140,
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: AppColors.surfaceContainerHigh,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 10,
  },
  flashImageWrapper: {
    position: "relative",
    width: "100%",
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: AppColors.surfaceContainerLow,
    marginBottom: 6,
  },
  flashImage: {
    width: "100%",
    height: "100%",
  },
  flashDiscountBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: AppColors.discount,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  flashDiscountText: {
    color: AppColors.white,
    fontSize: 9,
    fontWeight: "700",
  },
  flashHeartButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  flashBrand: {
    fontSize: 10,
    fontWeight: "700",
    color: AppColors.outline,
  },
  flashTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  flashPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  flashPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: AppColors.textPrimary,
  },
  flashOldPrice: {
    fontSize: 10,
    color: AppColors.outline,
    textDecorationLine: "line-through",
  },
});
