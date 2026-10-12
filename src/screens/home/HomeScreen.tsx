import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../../components/AppText";
import AppView from "../../components/AppView";
import HomeHeader from "../../components/headers/HomeHeader";
import AppTextInput from "../../components/AppTextInput";
import { Search } from "../../assets/svg/search";

import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";
import { AppTextStyles } from "../../themes";
import { useLocalization } from "../../hooks/translation_hooks";

import { useHomeViewModel } from "./viewModel/homeViewModel";
import { FlipkartProductCard } from "./components/FlipkartProductCard";
import { Product } from "./api/product.dto";

export default function HomeScreen() {
  const t = useLocalization();

  // MVVM View Model
  const {
    products,
    isLoading,
    isRefreshing,
    errorMessage,
    searchQuery,
    setSearchQuery,
    clearSearch,
    isProductWishlisted,
    toggleWishlist,
    navigateToProductDetail,
    onRefresh,
    totalProducts,
  } = useHomeViewModel();

  // Header Component for FlatList
  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* User Greeting */}
      <AppText style={AppTextStyles.subTitle}>Hi, Shopper 👋</AppText>
      <AppText style={AppTextStyles.heading}>{t.FIND_YOUR_STYLE}</AppText>

      {/* Search Bar */}
      <AppTextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        borderStyle={{ elevation: 0, marginVertical: AppPadding.padding12 }}
        prefix={<Search color={AppColors.outline} />}
        suffix={
          searchQuery ? (
            <TouchableOpacity
              onPress={clearSearch}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={AppColors.outline}
              />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name="qr-code-outline"
              size={20}
              color={AppColors.outline}
            />
          )
        }
        placeHolder={t.SEARCH_PLACEHOLDER}
      />

      {/* Products Grid Section Header */}
      <View style={styles.gridHeader}>
        <View style={{ flex: 1 }}>
          <AppText style={styles.gridTitle}>Products</AppText>
          <AppText style={styles.gridSubtitle}>
            {products.length > 0
              ? `${products.length} products available from store`
              : "Curated styles loaded from API"}
          </AppText>
        </View>
        <Ionicons
          name="options-outline"
          size={20}
          color={AppColors.onSurfaceVariant}
        />
      </View>
    </View>
  );

  // Empty or Loading State
  const renderEmptyOrState = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.primary} />
          <AppText style={styles.loadingText}>Loading products...</AppText>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={42}
            color={AppColors.error}
          />
          <AppText style={styles.errorTitle}>Failed to load products</AppText>
          <AppText style={styles.errorText}>{errorMessage}</AppText>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <AppText style={styles.retryText}>Retry</AppText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={48} color={AppColors.outline} />
        <AppText style={styles.emptyTitle}>No products found</AppText>
        <AppText style={styles.emptyText}>Check back later for updates.</AppText>
      </View>
    );
  };

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <FlipkartProductCard
        product={item}
        isWishlisted={isProductWishlisted(item._id)}
        onWishlistPress={() => toggleWishlist(item._id)}
        onPress={() => navigateToProductDetail(item)}
      />
    ),
    [isProductWishlisted, toggleWishlist, navigateToProductDetail],
  );

  return (
    <AppView style={styles.container}>
      <HomeHeader />

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyOrState}
        columnWrapperStyle={
          products.length > 0 ? styles.gridColumnWrapper : undefined
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[AppColors.primary]}
            tintColor={AppColors.primary}
          />
        }
        renderItem={renderProductItem}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: AppPadding.padding16,
    paddingTop: AppPadding.padding16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  headerSection: {
    width: "100%",
  },
  gridHeader: {
    flexDirection: "row",
    marginVertical: 14,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  gridTitle: {
    fontWeight: "700",
    color: AppColors.textPrimary,
    fontSize: 18,
  },
  gridSubtitle: {
    fontWeight: "400",
    color: AppColors.outline,
    fontSize: 12,
    marginTop: 2,
  },
  gridColumnWrapper: {
    gap: 12,
    marginBottom: 14,
  },

  /* States */
  loadingContainer: {
    width: "100%",
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: AppColors.textSecondary,
  },
  errorContainer: {
    width: "100%",
    paddingVertical: 36,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  errorTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
  errorText: {
    fontSize: 12,
    color: AppColors.error,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: AppColors.primary,
    borderRadius: 8,
  },
  retryText: {
    color: AppColors.white,
    fontWeight: "600",
    fontSize: 13,
  },
  emptyContainer: {
    width: "100%",
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.textPrimary,
    marginTop: 6,
  },
  emptyText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
