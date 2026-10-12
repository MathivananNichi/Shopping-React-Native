import type {
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";
import { AppRouteName, AppStackName } from "./routes";
import { CompositeNavigationProp } from "@react-navigation/native";

// Shared product model used across Home → ProductDetail
export interface ProductData {
  id: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  highlights: string[];
  sizes: number[];
}

export type RootStackParamList = {
  [AppStackName.splash]: undefined;
  [AppStackName.auth]: undefined;
  [AppStackName.mainBottom]: undefined;
  [AppRouteName.productDetail]: { product: ProductData };
  [AppRouteName.checkout]: undefined;
  [AppRouteName.myOrders]: undefined;
  [AppRouteName.editProfile]: undefined;
  [AppRouteName.map]: undefined;
};

export type SplashStackParamList = {
  [AppRouteName.splashScreen]: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  [AppRouteName.productDetail]: { product: ProductData };
};

export type AuthStackParamList = {
  [AppRouteName.loginScreen]: undefined;
  [AppRouteName.signupScreen]: undefined;
};

// Global React Navigation Type declaration
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Navigation Prop Helpers
export type RootStackNavProp = StackNavigationProp<RootStackParamList>;
export type SplashStackNavProp = StackNavigationProp<SplashStackParamList>;
export type AuthStackNavProp = StackNavigationProp<AuthStackParamList>;

export type LoginScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList>,
  StackNavigationProp<RootStackParamList>
>;
export type SignUpScreenNavProp = AuthStackNavProp;

export type SplashScreenProps = StackScreenProps<
  SplashStackParamList,
  typeof AppRouteName.splashScreen
>;
export type LoginScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof AppRouteName.loginScreen
>;
export type SignUpScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof AppRouteName.signupScreen
>;

export type ProductDetailScreenProps = StackScreenProps<
  RootStackParamList,
  typeof AppRouteName.productDetail
>;

export type CheckoutScreenProps = StackScreenProps<
  RootStackParamList,
  typeof AppRouteName.checkout
>;

export type MyOrdersScreenProps = StackScreenProps<
  RootStackParamList,
  typeof AppRouteName.myOrders
>;
