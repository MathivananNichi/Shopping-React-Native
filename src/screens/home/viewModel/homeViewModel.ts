import { useState, useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useProducts } from "../hooks/useProducts";
import { Product, ProductVariant } from "../api/product.dto";
import { RootStackParamList, ProductData } from "../../../navigation/types";
import { AppRouteName } from "../../../navigation/routes";
import { IProductRepository } from "../repository/productRepository";
import { clothingUrl } from "../../../components/ImageContainer";

export type HomeNavigationProp = StackNavigationProp<RootStackParamList>;

// Standard default product image fallback
export const DEFAULT_PRODUCT_IMAGE = clothingUrl.clothingUrl;

/**
 * Extracts a valid product image URL or returns default fallback placeholder
 */
export function getProductImage(product: Product): string {
  const firstVariant = product.variants?.[0];
  if (firstVariant?.images?.length && firstVariant.images[0]) {
    return firstVariant.images[0];
  }
  return DEFAULT_PRODUCT_IMAGE;
}

/**
 * Maps Backend API Product DTO to UI ProductData model used by ProductDetailScreen
 */
export function mapProductToProductData(product: Product): ProductData {
 product.variants[0].colorId
  const brandName =
    typeof product.brandId === "object"
      ? product.brandId?.name || "Generic"
      : "Brand";

  const categoryName =
    typeof product.categoryId === "object"
      ? product.categoryId?.name || "General"
      : "General";

  const primaryVariant: ProductVariant | undefined = product.variants?.[0];
  const price =
    primaryVariant?.effectivePrice || product.minVariantPrice || 499;
  const originalPrice = primaryVariant?.actualPrice || price * 1.15;
  const discount =
    primaryVariant?.discountPercentage ||
    Math.round(((originalPrice - price) / originalPrice) * 100);

  const image = getProductImage(product);
  const images = primaryVariant?.images?.length ? primaryVariant.images : [image];

  return {
    id: product._id,
    brand: brandName,
    name: product.name,
    category: categoryName,
    price: Math.round(price),
    originalPrice: Math.round(originalPrice),
    discount,
    rating: 4.3,
    reviewCount: 1240,
    image,
    images,
    highlights: [
      product.description || "Authentic product with standard warranty",
      "Fast & Free Delivery across India",
      "7 Days Replacement Policy",
      "Cash on Delivery available",
    ],
    sizes: [1, 2, 3],
  };
}

/**
 * MVVM Home Screen ViewModel - Directly returns fetched products
 */
export function useHomeViewModel(repository?: IProductRepository) {
  const navigation = useNavigation<HomeNavigationProp>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isManualRefreshing, setIsManualRefreshing] = useState<boolean>(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // TanStack Query to fetch products with standard caching & DI repository
  const {
    data: responseData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useProducts(undefined, repository);

  // Directly return the fetched products without any filter
  const products: Product[] = useMemo(() => {
    return responseData?.data?.products ?? [];
  }, [responseData]);

  // Flash deals / Best offers directly from products
  const flashDeals: Product[] = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const discA = a.variants?.[0]?.discountPercentage ?? 0;
        const discB = b.variants?.[0]?.discountPercentage ?? 0;
        return discB - discA;
      })
      .slice(0, 6);
  }, [products]);

  // Wishlist actions
  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const isProductWishlisted = useCallback(
    (productId: string) => wishlistIds.has(productId),
    [wishlistIds],
  );

  // Navigation action to Product Detail
  const navigateToProductDetail = useCallback(
    (product: Product) => {
      const productData = mapProductToProductData(product);
      navigation.navigate(AppRouteName.productDetail, {
        product: productData,
      });
    },
    [navigation],
  );

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  const clearSearch = useCallback(() => setSearchQuery(""), []);

  return {
    products,
    allProducts: products,
    flashDeals,
    isLoading,
    isFetching,
    isRefreshing: isManualRefreshing,
    errorMessage: error ? error.message : null,
    searchQuery,
    setSearchQuery,
    clearSearch,
    wishlistIds,
    toggleWishlist,
    isProductWishlisted,
    navigateToProductDetail,
    onRefresh,
    refetch,
    totalProducts: responseData?.data?.pagination?.total ?? products.length,
  };
}

export const homeViewModel = useHomeViewModel;
