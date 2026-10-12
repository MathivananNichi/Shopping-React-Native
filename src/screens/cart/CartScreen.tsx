import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppView from "../../components/AppView";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { AppRouteName } from "../../navigation/routes";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  detail: string;
  price: number;
  qty: number;
  image: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    detail: "Size: 8  •  White",
    price: 4499,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
  },
  {
    id: "2",
    name: "Levi's Men 512 Slim Jeans",
    detail: "Size: 32  •  Blue",
    price: 1999,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
  },
  {
    id: "3",
    name: "Fossil Chronograph Watch",
    detail: "Color: Brown Leather",
    price: 7999,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80",
  },
];

const DISCOUNT = 1500;
const DELIVERY_THRESHOLD = 5000;

function formatINR(amount: number) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}

// ─── Cart Item Card ───────────────────────────────────────────────────────────
function CartItemCard({
  item,
  onRemove,
  onQtyChange,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, delta: number) => void;
}) {
  return (
    <View style={styles.itemCard}>
      {/* Image */}
      <View style={styles.itemImageBox}>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View style={styles.itemInfo}>
        <View style={styles.itemTopRow}>
          <AppText style={styles.itemName} numberOfLines={2}>
            {item.name}
          </AppText>
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.deleteBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={AppColors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <AppText style={styles.itemDetail}>{item.detail}</AppText>
        <View style={styles.itemBottomRow}>
          <AppText style={styles.itemPrice}>{formatINR(item.price)}</AppText>
          {/* Qty Stepper */}
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepperBtn}
              activeOpacity={0.7}
              onPress={() => onQtyChange(item.id, -1)}
            >
              <Ionicons name="remove" size={16} color={AppColors.primary} />
            </TouchableOpacity>
            <AppText style={styles.stepperQty}>{item.qty}</AppText>
            <TouchableOpacity
              style={styles.stepperBtn}
              activeOpacity={0.7}
              onPress={() => onQtyChange(item.id, 1)}
            >
              <Ionicons name="add" size={16} color={AppColors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart() {
   
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="cart-outline" size={56} color={AppColors.primary} />
      </View>
      <AppText style={styles.emptyTitle}>Your cart is empty</AppText>
      <AppText style={styles.emptySubtitle}>
        Looks like you haven't added anything yet.
      </AppText>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CartScreen() {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? DISCOUNT : 0;
  const delivery = subtotal >= DELIVERY_THRESHOLD ? 0 : 99;
  const total = subtotal - discount + delivery;

  function handleRemove(id: string) {
    Alert.alert("Remove Item", "Remove this item from your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setItems((prev) => prev.filter((i) => i.id !== id)),
      },
    ]);
  }

  function handleQtyChange(id: string, delta: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  }

  function handleApplyCoupon() {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      Alert.alert(
        "Coupon Applied!",
        "You saved " + formatINR(DISCOUNT) + " with SAVE10",
      );
    } else {
      Alert.alert("Invalid Coupon", "Please enter a valid coupon code.");
    }
  }

  return (
    <AppView style={{ padding: 0 }}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <AppText style={styles.headerTitle}>My Cart</AppText>
          {items.length > 0 && (
            <AppText style={styles.headerSub}>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </AppText>
          )}
        </View>
        {items.length > 0 && (
          <TouchableOpacity activeOpacity={0.7}>
            <AppText style={styles.editText}>Edit</AppText>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* ── Cart Items ── */}
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onQtyChange={handleQtyChange}
              />
            ))}

            {/* ── Coupon Row ── */}
            <View style={styles.couponRow}>
              <Ionicons
                name="pricetag-outline"
                size={18}
                color={AppColors.textSecondary}
              />
              <TextInput
                style={styles.couponInput}
                placeholder="Apply Coupon Code"
                placeholderTextColor={AppColors.textSecondary}
                value={coupon}
                onChangeText={setCoupon}
                autoCapitalize="characters"
                editable={!couponApplied}
              />
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  couponApplied && styles.applyBtnApplied,
                ]}
                onPress={handleApplyCoupon}
                activeOpacity={0.8}
                disabled={couponApplied}
              >
                <AppText style={styles.applyBtnText}>
                  {couponApplied ? "Applied" : "Apply"}
                </AppText>
              </TouchableOpacity>
            </View>

            {/* ── Order Summary ── */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Subtotal</AppText>
                <AppText style={styles.summaryValue}>
                  {formatINR(subtotal)}
                </AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Discount</AppText>
                <AppText style={[styles.summaryValue, styles.discountValue]}>
                  {discount > 0 ? "- " + formatINR(discount) : formatINR(0)}
                </AppText>
              </View>
              <View style={styles.summaryRow}>
                <AppText style={styles.summaryLabel}>Delivery</AppText>
                <AppText
                  style={[
                    styles.summaryValue,
                    delivery === 0 && styles.freeDelivery,
                  ]}
                >
                  {delivery === 0 ? "FREE" : formatINR(delivery)}
                </AppText>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <View>
                  <AppText style={styles.totalLabel}>Total</AppText>
                  <AppText style={styles.totalItemCount}>
                    ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </AppText>
                </View>
                <AppText style={styles.totalValue}>{formatINR(total)}</AppText>
              </View>
            </View>

            {delivery > 0 && (
              <AppText style={styles.freeShippingHint}>
                Add {formatINR(DELIVERY_THRESHOLD - subtotal)} more for FREE
                delivery!
              </AppText>
            )}
          </ScrollView>

          {/* ── Checkout Button ── */}
          <View style={styles.checkoutBar}>
            <AppButton
              title={"Proceed to Checkout  \u2192"}
              style={styles.checkoutBtn}
              onPress={() => {
                const rootNav = navigation.getParent() || navigation;
                rootNav.navigate(AppRouteName.checkout);
              }}
            />
          </View>
        </>
      )}
    </AppView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppPadding.padding16,
    paddingVertical: 12,
    backgroundColor: AppColors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.surfaceContainerHighest,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 1,
  },
  editText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 10,
  },

  // Item Card
  itemCard: {
    flexDirection: "row",
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  itemImageBox: {
    width: 80,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: AppColors.surfaceContainer,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  deleteBtn: {
    padding: 4,
  },
  itemDetail: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 3,
  },
  itemBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },

  // Stepper
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surfaceContainerLow,
    borderRadius: 10,
    overflow: "hidden",
  },
  stepperBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperQty: {
    fontSize: 14,
    fontWeight: "700",
    color: AppColors.textPrimary,
    minWidth: 24,
    textAlign: "center",
  },

  // Coupon
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: AppColors.outlineVariant,
    gap: 8,
  },
  couponInput: {
    flex: 1,
    height: 44,
    fontSize: 13,
    color: AppColors.textPrimary,
  },
  applyBtn: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  applyBtnApplied: {
    backgroundColor: AppColors.success,
  },
  applyBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: AppColors.onPrimary,
  },

  // Summary
  summaryCard: {
    backgroundColor: AppColors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: AppColors.textSecondary,
    fontWeight: "400",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
  discountValue: {
    color: AppColors.discount,
  },
  freeDelivery: {
    color: AppColors.success,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.surfaceContainerHighest,
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  totalItemCount: {
    fontSize: 11,
    color: AppColors.textSecondary,
    marginTop: 1,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: AppColors.textPrimary,
  },
  freeShippingHint: {
    textAlign: "center",
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: "600",
  },

  // Checkout
  checkoutBar: {
    paddingHorizontal: AppPadding.padding16,
    paddingVertical: 12,
    backgroundColor: AppColors.background,
    borderTopWidth: 1,
    borderTopColor: AppColors.surfaceContainerHighest,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutBtn: {
    backgroundColor: AppColors.obsidian,
    borderRadius: 14,
    height: 52,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
