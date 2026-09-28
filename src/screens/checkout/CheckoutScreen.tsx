import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppRouteName, AppStackName } from "../../navigation/routes";

interface OrderThumbItem {
  id: string;
  name: string;
  image: string;
  qty: number;
}

const ITEMS_IN_ORDER: OrderThumbItem[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    qty: 1,
  },
  {
    id: "2",
    name: "Levi's Men 512 Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
    qty: 1,
  },
  {
    id: "3",
    name: "Fossil Chrono Watch",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80",
    qty: 1,
  },
];

type DeliveryMethodType = "standard" | "express";
type PaymentMethodType = "upi" | "card" | "pay_later" | "cod";

function formatINR(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethodType>("standard");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("upi");
  const [showBreakupModal, setShowBreakupModal] = useState(false);
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);

  // Price calculations
  const itemsTotal = 14497;
  const couponDiscount = 1500;
  const deliveryFee = deliveryMethod === "express" ? 99 : 0;
  const totalAmount = itemsTotal - couponDiscount + deliveryFee;

  function handlePlaceOrder() {
    setOrderSuccessModal(true);
  }

  function handleViewOrders() {
    setOrderSuccessModal(false);
    navigation.replace(AppRouteName.myOrders);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Top Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={AppColors.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleGroup}>
            <AppText style={styles.headerTitle}>Checkout</AppText>
            <AppText style={styles.headerSubtitle}>Step 2 of 2</AppText>
          </View>
        </View>

        {/* 100% Secure Badge */}
        <View style={styles.secureBadge}>
          <Ionicons name="lock-closed" size={12} color={AppColors.primary} />
          <AppText style={styles.secureBadgeText}>100% SECURE</AppText>
        </View>
      </View>

      {/* ── Scrollable Sections ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ────────────────────────────────────────────────────────── */}
        {/* 1. DELIVERY ADDRESS CARD */}
        {/* ────────────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={AppColors.primary}
                />
              </View>
              <AppText style={styles.cardSectionTitle}>DELIVERY ADDRESS</AppText>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Change Address",
                  "Select from your saved addresses or add a new one."
                )
              }
              activeOpacity={0.7}
            >
              <AppText style={styles.changeLink}>Change</AppText>
            </TouchableOpacity>
          </View>

          {/* User Name, Tag, Phone */}
          <View style={styles.addressInfoBlock}>
            <View style={styles.nameRow}>
              <AppText style={styles.recipientName}>Saran S</AppText>
              <View style={styles.homeTag}>
                <AppText style={styles.homeTagText}>HOME</AppText>
              </View>
              <AppText style={styles.phoneText}>+91 98765 43210</AppText>
            </View>

            {/* Address Text */}
            <AppText style={styles.addressLine}>
              #402, Green Glen Layout, Bellandur, Bangalore, Karnataka - 560103
            </AppText>

            {/* Deliverable Badge */}
            <View style={styles.deliverableBadge}>
              <Ionicons
                name="checkmark-outline"
                size={14}
                color="#059669"
                style={{ marginRight: 4 }}
              />
              <AppText style={styles.deliverableText}>
                Deliverable to this location
              </AppText>
            </View>
          </View>
        </View>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. DELIVERY METHOD CARD */}
        {/* ────────────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="flash" size={16} color={AppColors.primary} />
              </View>
              <AppText style={styles.cardSectionTitle}>DELIVERY METHOD</AppText>
            </View>
          </View>

          {/* Standard Delivery Option */}
          <TouchableOpacity
            style={[
              styles.methodOption,
              deliveryMethod === "standard"
                ? styles.methodOptionActive
                : styles.methodOptionInactive,
            ]}
            activeOpacity={0.85}
            onPress={() => setDeliveryMethod("standard")}
          >
            <View style={styles.optionRow}>
              <View style={styles.radioOuter}>
                {deliveryMethod === "standard" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <View style={styles.optionTextColumn}>
                <View style={styles.optionTitleRow}>
                  <AppText style={styles.optionTitle}>Standard Delivery</AppText>
                  <View style={styles.freeBadge}>
                    <AppText style={styles.freeBadgeText}>FREE</AppText>
                  </View>
                </View>
                <AppText style={styles.optionSubtitle}>
                  Arrives in 3–5 days (by Friday, 15 May)
                </AppText>
              </View>

              {deliveryMethod === "standard" && (
                <View style={styles.checkedCircle}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Express Delivery Option */}
          <TouchableOpacity
            style={[
              styles.methodOption,
              deliveryMethod === "express"
                ? styles.methodOptionActive
                : styles.methodOptionInactive,
              { marginTop: 10 },
            ]}
            activeOpacity={0.85}
            onPress={() => setDeliveryMethod("express")}
          >
            <View style={styles.optionRow}>
              <View style={styles.radioOuter}>
                {deliveryMethod === "express" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <View style={styles.optionTextColumn}>
                <View style={styles.optionTitleRow}>
                  <AppText style={styles.optionTitle}>
                    Express Delivery{"  "}₹99
                  </AppText>
                </View>
                <AppText style={styles.optionSubtitle}>
                  Guaranteed next-day delivery
                </AppText>
              </View>

              <View style={styles.tomorrowBadge}>
                <Ionicons
                  name="flash"
                  size={12}
                  color="#D97706"
                  style={{ marginRight: 2 }}
                />
                <AppText style={styles.tomorrowBadgeText}>By Tomorrow</AppText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. PAYMENT METHOD CARD */}
        {/* ────────────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="card-outline"
                  size={16}
                  color={AppColors.primary}
                />
              </View>
              <AppText style={styles.cardSectionTitle}>PAYMENT METHOD</AppText>
            </View>
            <View style={styles.discountPill}>
              <AppText style={styles.discountPillText}>
                ₹1,500 Off Applied
              </AppText>
            </View>
          </View>

          {/* UPI Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionBox,
              paymentMethod === "upi" && styles.paymentOptionBoxActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setPaymentMethod("upi")}
          >
            <View style={styles.paymentHeaderRow}>
              <View style={styles.radioOuter}>
                {paymentMethod === "upi" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <AppText style={styles.paymentOptionTitle}>UPI Options</AppText>

              <View style={styles.fastestBadge}>
                <AppText style={styles.fastestBadgeText}>FASTEST</AppText>
              </View>

              {/* Brand Pills */}
              <View style={styles.upiLogosRow}>
                <View style={styles.brandPill}>
                  <AppText style={[styles.brandPillText, { color: "#1A1B22" }]}>
                    GPay
                  </AppText>
                </View>
                <View style={styles.brandPill}>
                  <AppText style={[styles.brandPillText, { color: "#5F259F" }]}>
                    PhonePe
                  </AppText>
                </View>
                <View style={styles.brandPill}>
                  <AppText style={[styles.brandPillText, { color: "#00BAF2" }]}>
                    Paytm
                  </AppText>
                </View>
              </View>
            </View>

            {/* Nested Selected UPI Box */}
            {paymentMethod === "upi" && (
              <View style={styles.selectedUpiBox}>
                <View style={styles.upiIdRow}>
                  <View style={styles.activeGreenDot} />
                  <AppText style={styles.upiIdText}>
                    saran.shetty@okaxis
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.prompt
                      ? Alert.prompt(
                          "Edit UPI ID",
                          "Enter your Virtual Payment Address (VPA):"
                        )
                      : Alert.alert("Edit UPI ID", "Change UPI ID: saran.shetty@okaxis")
                  }
                  activeOpacity={0.7}
                >
                  <AppText style={styles.editLink}>Edit</AppText>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          {/* Credit / Debit Card Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionBox,
              styles.paymentOptionSimple,
              paymentMethod === "card" && styles.paymentOptionBoxActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setPaymentMethod("card")}
          >
            <View style={styles.optionRow}>
              <View style={styles.radioOuter}>
                {paymentMethod === "card" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <View style={styles.optionTextColumn}>
                <AppText style={styles.paymentOptionTitle}>
                  Credit / Debit Card
                </AppText>
                <AppText style={styles.optionSubtitle}>
                  HDFC Bank •••• 4821
                </AppText>
              </View>

              <View style={styles.cardsRow}>
                <View style={[styles.cardBrandBadge, { borderColor: "#BFDBFE" }]}>
                  <AppText style={[styles.cardBrandText, { color: "#1D4ED8" }]}>
                    VISA
                  </AppText>
                </View>
                <View style={[styles.cardBrandBadge, { borderColor: "#FECACA" }]}>
                  <AppText style={[styles.cardBrandText, { color: "#DC2626" }]}>
                    MC
                  </AppText>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Shoply Pay Later Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionBox,
              styles.paymentOptionSimple,
              paymentMethod === "pay_later" && styles.paymentOptionBoxActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setPaymentMethod("pay_later")}
          >
            <View style={styles.optionRow}>
              <View style={styles.radioOuter}>
                {paymentMethod === "pay_later" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <View style={styles.optionTextColumn}>
                <View style={styles.optionTitleRow}>
                  <AppText style={styles.paymentOptionTitle}>
                    Shoply Pay Later
                  </AppText>
                  <View style={styles.coinsBadge}>
                    <AppText style={styles.coinsBadgeText}>850 Coins</AppText>
                  </View>
                </View>
                <AppText style={styles.optionSubtitle}>
                  Pay next month • 0% interest
                </AppText>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={AppColors.onSurfaceVariant}
              />
            </View>
          </TouchableOpacity>

          {/* Cash on Delivery Option */}
          <TouchableOpacity
            style={[
              styles.paymentOptionBox,
              styles.paymentOptionSimple,
              paymentMethod === "cod" && styles.paymentOptionBoxActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setPaymentMethod("cod")}
          >
            <View style={styles.optionRow}>
              <View style={styles.radioOuter}>
                {paymentMethod === "cod" ? (
                  <View style={styles.radioInnerActive} />
                ) : (
                  <View style={styles.radioInnerInactive} />
                )}
              </View>

              <View style={styles.optionTextColumn}>
                <AppText style={styles.paymentOptionTitle}>
                  Cash on Delivery (COD)
                </AppText>
                <AppText style={styles.optionSubtitle}>
                  Pay cash or scan QR upon arrival
                </AppText>
              </View>

              <View style={styles.availableBadge}>
                <AppText style={styles.availableBadgeText}>Available</AppText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. ITEMS IN ORDER (3) CARD */}
        {/* ────────────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <AppText style={styles.cardSectionTitle}>
              ITEMS IN ORDER ({ITEMS_IN_ORDER.length})
            </AppText>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <AppText style={styles.changeLink}>Edit Cart</AppText>
            </TouchableOpacity>
          </View>

          {/* Item Thumbnails Preview */}
          <View style={styles.orderPreviewRow}>
            <View style={styles.thumbnailsList}>
              {ITEMS_IN_ORDER.map((item) => (
                <View key={item.id} style={styles.thumbWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.thumbImage}
                    resizeMode="cover"
                  />
                  <View style={styles.qtyBadge}>
                    <AppText style={styles.qtyBadgeText}>{item.qty}</AppText>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.orderSummaryText}>
              <AppText style={styles.orderBrandSummary}>
                Nike 270, Levi's & Fossil
              </AppText>
              <AppText style={styles.orderPackageSubtitle}>
                Standard packaged box
              </AppText>
            </View>
          </View>

          <View style={styles.dashedDivider} />

          {/* Price Breakdown */}
          <View style={styles.breakdownRow}>
            <AppText style={styles.breakdownLabel}>Items Total (MRP)</AppText>
            <AppText style={styles.breakdownValue}>
              {formatINR(itemsTotal)}
            </AppText>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.couponLabelGroup}>
              <AppText style={styles.breakdownLabel}>Coupon Discount</AppText>
              <View style={styles.couponTag}>
                <AppText style={styles.couponTagText}>SUMMER50</AppText>
              </View>
            </View>
            <AppText style={styles.breakdownGreen}>
              -{formatINR(couponDiscount)}
            </AppText>
          </View>

          <View style={styles.breakdownRow}>
            <AppText style={styles.breakdownLabel}>Delivery Fee</AppText>
            <AppText style={styles.breakdownGreen}>
              {deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
            </AppText>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>Total Amount</AppText>
            <AppText style={styles.totalValue}>{formatINR(totalAmount)}</AppText>
          </View>
        </View>

        {/* ────────────────────────────────────────────────────────── */}
        {/* TRUST BADGES ROW */}
        {/* ────────────────────────────────────────────────────────── */}
        <View style={styles.trustBadgesRow}>
          <View style={styles.trustItem}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color={AppColors.textSecondary}
            />
            <AppText style={styles.trustText}>100% SECURE</AppText>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Ionicons
              name="refresh-outline"
              size={18}
              color={AppColors.textSecondary}
            />
            <AppText style={styles.trustText}>15 DAYS RETURN</AppText>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Ionicons
              name="checkmark-done-outline"
              size={18}
              color={AppColors.textSecondary}
            />
            <AppText style={styles.trustText}>100% GENUINE</AppText>
          </View>
        </View>
      </ScrollView>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── STICKY BOTTOM CHECKOUT BAR ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          style={styles.priceColumn}
          activeOpacity={0.7}
          onPress={() => setShowBreakupModal(true)}
        >
          <AppText style={styles.toPayLabel}>TO PAY</AppText>
          <AppText style={styles.bottomPrice}>{formatINR(totalAmount)}</AppText>
          <View style={styles.breakupToggleRow}>
            <AppText style={styles.breakupLink}>View breakup</AppText>
            <Ionicons name="chevron-up" size={14} color={AppColors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.placeOrderBtn}
          activeOpacity={0.88}
          onPress={handlePlaceOrder}
        >
          <AppText style={styles.placeOrderText}>Place Order</AppText>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* ── Price Breakup Sheet/Modal ── */}
      <Modal
        visible={showBreakupModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowBreakupModal(false)}
      >
        <TouchableOpacity
          style={styles.breakupModalOverlay}
          activeOpacity={1}
          onPress={() => setShowBreakupModal(false)}
        >
          <View style={styles.breakupModalBox}>
            <View style={styles.breakupModalHeader}>
              <AppText style={styles.breakupModalTitle}>Price Details</AppText>
              <TouchableOpacity onPress={() => setShowBreakupModal(false)}>
                <Ionicons
                  name="close"
                  size={20}
                  color={AppColors.textPrimary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.breakdownRow}>
              <AppText style={styles.breakdownLabel}>MRP Total</AppText>
              <AppText style={styles.breakdownValue}>
                {formatINR(itemsTotal)}
              </AppText>
            </View>
            <View style={styles.breakdownRow}>
              <AppText style={styles.breakdownLabel}>Coupon (SUMMER50)</AppText>
              <AppText style={styles.breakdownGreen}>
                -{formatINR(couponDiscount)}
              </AppText>
            </View>
            <View style={styles.breakdownRow}>
              <AppText style={styles.breakdownLabel}>Delivery Charges</AppText>
              <AppText style={styles.breakdownGreen}>
                {deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
              </AppText>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.totalRow}>
              <AppText style={styles.totalLabel}>Total Payable</AppText>
              <AppText style={styles.totalValue}>
                {formatINR(totalAmount)}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Order Success Modal ── */}
      <Modal
        visible={orderSuccessModal}
        animationType="fade"
        transparent
        onRequestClose={() => setOrderSuccessModal(false)}
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>
            <AppText style={styles.successTitle}>Order Placed!</AppText>
            <AppText style={styles.successSubtitle}>
              Order #ORD123456 confirmed. We've sent details to your registered email & phone.
            </AppText>

            <TouchableOpacity
              style={styles.viewOrdersBtn}
              activeOpacity={0.88}
              onPress={handleViewOrders}
            >
              <AppText style={styles.viewOrdersBtnText}>View My Orders</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueShoppingBtn}
              activeOpacity={0.7}
              onPress={() => {
                setOrderSuccessModal(false);
                navigation.navigate(AppStackName.mainBottom, { screen: "Home" });
              }}
            >
              <AppText style={styles.continueShoppingText}>
                Continue Shopping
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAF8FF",
  },
  // ── Header ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1B22",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6F7078",
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: AppColors.primary,
    letterSpacing: 0.4,
  },
  // ── Scroll Content ──
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
    gap: 14,
  },
  // ── Card ──
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EDEDF6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F0EDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A1B22",
    letterSpacing: 0.5,
  },
  changeLink: {
    fontSize: 13,
    fontWeight: "700",
    color: AppColors.primary,
  },
  // ── Address Details ──
  addressInfoBlock: {
    gap: 6,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1B22",
  },
  homeTag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  homeTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4B5563",
  },
  phoneText: {
    fontSize: 13,
    color: "#6F7078",
  },
  addressLine: {
    fontSize: 13,
    color: "#6F7078",
    lineHeight: 18,
    marginTop: 2,
  },
  deliverableBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  deliverableText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  // ── Delivery Methods ──
  methodOption: {
    borderRadius: 12,
    padding: 12,
  },
  methodOptionActive: {
    borderWidth: 1.5,
    borderColor: "#6C4DFF",
    backgroundColor: "#FFFFFF",
  },
  methodOptionInactive: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInnerActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.primary,
  },
  radioInnerInactive: {
    width: 0,
    height: 0,
  },
  optionTextColumn: {
    flex: 1,
  },
  optionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1B22",
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#6F7078",
    marginTop: 2,
  },
  freeBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  freeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#16A34A",
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  tomorrowBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  tomorrowBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  // ── Payment Methods ──
  discountPill: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  discountPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
  },
  paymentOptionBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  paymentOptionBoxActive: {
    borderWidth: 1.5,
    borderColor: "#6C4DFF",
  },
  paymentOptionSimple: {
    marginBottom: 10,
  },
  paymentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentOptionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1B22",
  },
  fastestBadge: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  fastestBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  upiLogosRow: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 4,
  },
  brandPill: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  brandPillText: {
    fontSize: 10,
    fontWeight: "700",
  },
  selectedUpiBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
  },
  upiIdRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 8,
  },
  upiIdText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1A1B22",
  },
  editLink: {
    fontSize: 12,
    fontWeight: "700",
    color: AppColors.primary,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 4,
  },
  cardBrandBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardBrandText: {
    fontSize: 10,
    fontWeight: "800",
  },
  coinsBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coinsBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#D97706",
  },
  availableBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  availableBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#059669",
  },
  // ── Items In Order ──
  orderPreviewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  thumbnailsList: {
    flexDirection: "row",
    gap: 8,
  },
  thumbWrapper: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  qtyBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  orderSummaryText: {
    flex: 1,
  },
  orderBrandSummary: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1B22",
  },
  orderPackageSubtitle: {
    fontSize: 12,
    color: "#6F7078",
    marginTop: 2,
  },
  dashedDivider: {
    height: 1,
    backgroundColor: "#EDEDF6",
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 13,
    color: "#4B5563",
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1B22",
  },
  couponLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  couponTag: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  couponTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#16A34A",
  },
  breakdownGreen: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16A34A",
  },
  totalDivider: {
    height: 1,
    backgroundColor: "#EDEDF6",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1B22",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1B22",
  },
  // ── Trust Badges ──
  trustBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EDEDF6",
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6F7078",
  },
  trustDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#E5E7EB",
  },
  // ── Bottom Fixed Bar ──
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EDEDF6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  priceColumn: {
    justifyContent: "center",
  },
  toPayLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 0.5,
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1B22",
  },
  breakupToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  breakupLink: {
    fontSize: 12,
    fontWeight: "700",
    color: AppColors.primary,
  },
  placeOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C4DFF",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#6C4DFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  // ── Price Breakup Modal ──
  breakupModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  breakupModalBox: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  breakupModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  breakupModalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1B22",
  },
  // ── Success Modal ──
  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successModalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1B22",
  },
  successSubtitle: {
    fontSize: 14,
    color: "#6F7078",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 24,
  },
  viewOrdersBtn: {
    backgroundColor: AppColors.primary,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  viewOrdersBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  continueShoppingBtn: {
    paddingVertical: 10,
  },
  continueShoppingText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primary,
  },
});
