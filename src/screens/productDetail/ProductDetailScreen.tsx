import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";
import AppButton from "../../components/AppButton";
import { ProductDetailScreenProps } from "../../navigation/types";
import { AppRouteName } from "../../navigation/routes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function formatINR(amount: number) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? "star" : "star-outline"}
          size={14}
          color="#F59E0B"
        />
      ))}
    </View>
  );
}

export default function ProductDetailScreen({ route, navigation }: ProductDetailScreenProps) {
  const { product } = route.params;
  const insets = useSafeAreaInsets();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      Alert.alert("Select Size", "Please select a size before adding to cart.");
      return;
    }
    Alert.alert("Added to Cart", `${product.name} (Size ${selectedSize}) added to your cart!`);
  }

  function handleBuyNow() {
    if (!selectedSize) {
      Alert.alert("Select Size", "Please select a size before buying.");
      return;
    }
    navigation.navigate(AppRouteName.checkout);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Floating Back & Wishlist ── */}
      <View style={styles.floatingBar}>
        <TouchableOpacity
          style={styles.floatingBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={AppColors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingBtn}
          activeOpacity={0.8}
          onPress={() => setWishlisted((w) => !w)}
        >
          <Ionicons
            name={wishlisted ? "heart" : "heart-outline"}
            size={20}
            color={wishlisted ? AppColors.error : AppColors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* ── Product Image ── */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Discount badge */}
          <View style={styles.discountBadge}>
            <AppText style={styles.discountBadgeText}>-{product.discount}% OFF</AppText>
          </View>
        </View>

        <View style={styles.content}>
          {/* ── Brand & Title ── */}
          <AppText style={styles.brand}>{product.brand.toUpperCase()}</AppText>
          <AppText style={styles.category}>{product.category}</AppText>
          <AppText style={styles.name}>{product.name}</AppText>

          {/* ── Rating Row ── */}
          <View style={styles.ratingRow}>
            <StarRating rating={product.rating} />
            <AppText style={styles.ratingText}>
              {product.rating.toFixed(1)}
            </AppText>
            <AppText style={styles.reviewCount}>
              ({product.reviewCount.toLocaleString()} reviews)
            </AppText>
          </View>

          {/* ── Price Row ── */}
          <View style={styles.priceRow}>
            <AppText style={styles.price}>{formatINR(product.price)}</AppText>
            <AppText style={styles.originalPrice}>
              {formatINR(product.originalPrice)}
            </AppText>
            <View style={styles.savingBadge}>
              <AppText style={styles.savingText}>Save {formatINR(product.originalPrice - product.price)}</AppText>
            </View>
          </View>

          {/* ── Size Selector ── */}
          <View style={styles.sizeHeader}>
            <AppText style={styles.sectionLabel}>Select Size (UK)</AppText>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.sizeGuideText}>Size Guide</AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeRow}>
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeChip,
                  selectedSize === size && styles.sizeChipSelected,
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedSize(size)}
              >
                <AppText
                  style={[
                    styles.sizeChipText,
                    selectedSize === size && styles.sizeChipTextSelected,
                  ]}
                >
                  {size}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Delivery Perks ── */}
          <View style={styles.perksRow}>
            {[
              { icon: "car-outline", label: "Free Delivery" },
              { icon: "refresh-outline", label: "18 Days Return" },
              { icon: "shield-checkmark-outline", label: "100% Original" },
            ].map((perk) => (
              <View key={perk.label} style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Ionicons name={perk.icon as any} size={18} color={AppColors.primary} />
                </View>
                <AppText style={styles.perkLabel}>{perk.label}</AppText>
              </View>
            ))}
          </View>

          {/* ── Divider ── */}
          <View style={styles.divider} />

          {/* ── Highlights ── */}
          <AppText style={styles.sectionLabel}>Highlights</AppText>
          <View style={styles.highlightList}>
            {(showMore ? product.highlights : product.highlights.slice(0, 3)).map(
              (h, i) => (
                <View key={i} style={styles.highlightRow}>
                  <View style={styles.bullet} />
                  <AppText style={styles.highlightText}>{h}</AppText>
                </View>
              ),
            )}
          </View>
          {product.highlights.length > 3 && (
            <TouchableOpacity
              onPress={() => setShowMore((s) => !s)}
              activeOpacity={0.7}
              style={styles.moreDetails}
            >
              <AppText style={styles.moreDetailsText}>
                {showMore ? "Show less" : "More details"}
              </AppText>
              <Ionicons
                name={showMore ? "chevron-up" : "chevron-down"}
                size={14}
                color={AppColors.primary}
              />
            </TouchableOpacity>
          )}

          {/* Bottom spacing for sticky footer */}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* ── Sticky Footer ── */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <AppButton
          title="Add to Cart"
          style={styles.addToCartBtn}
          textStyle={{ color: AppColors.primary }}
          onPress={handleAddToCart}
        />
        <AppButton
          title="Buy Now"
          style={styles.buyNowBtn}
          onPress={handleBuyNow}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  // Floating bar
  floatingBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 50,
    paddingBottom: 8,
  },
  floatingBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  // Image
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
    backgroundColor: AppColors.surfaceContainerLow,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: AppColors.error,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  // Content
  content: {
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 16,
    backgroundColor: AppColors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  brand: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.primary,
    letterSpacing: 1,
  },
  category: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: AppColors.textPrimary,
    marginTop: 4,
    lineHeight: 26,
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  reviewCount: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },

  // Price
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: AppColors.textPrimary,
  },
  originalPrice: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textDecorationLine: "line-through",
  },
  savingBadge: {
    backgroundColor: AppColors.errorContainer,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  savingText: {
    fontSize: 11,
    fontWeight: "600",
    color: AppColors.error,
  },

  // Sizes
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  sizeGuideText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppColors.primary,
    textDecorationLine: "underline",
  },
  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sizeChip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: AppColors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.surfaceContainerLowest,
  },
  sizeChipSelected: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.primary,
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
  sizeChipTextSelected: {
    color: AppColors.onPrimary,
  },

  // Perks
  perksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  perkItem: {
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  perkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  perkLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: AppColors.textSecondary,
    textAlign: "center",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: AppColors.surfaceContainerHighest,
    marginVertical: 16,
  },

  // Highlights
  highlightList: {
    gap: 8,
    marginTop: 10,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.primary,
    marginTop: 6,
  },
  highlightText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  moreDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  moreDetailsText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.primary,
  },

  // Footer
  footer: {
    flexDirection: "row",
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 12,
    gap: 12,
    backgroundColor: AppColors.background,
    borderTopWidth: 1,
    borderTopColor: AppColors.surfaceContainerHighest,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: AppColors.onPrimaryContainer,
    borderRadius: 14,
    height: 50,
    borderWidth: 1.5,
    borderColor: AppColors.primary,
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: AppColors.obsidian,
    borderRadius: 14,
    height: 50,
  },
});
