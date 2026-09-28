import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderData {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  itemsCount: number;
  totalAmount: number;
  statusSubtitle: string;
  actionText: string;
  isTracking?: boolean;
  items: OrderItem[];
}

const ORDERS_DATA: OrderData[] = [
  {
    id: "1",
    orderNumber: "ORD123456",
    date: "12 May 2026",
    status: "Delivered",
    itemsCount: 3,
    totalAmount: 12997,
    statusSubtitle: "Delivered to Home",
    actionText: "View Details",
    isTracking: false,
    items: [
      {
        id: "p1",
        name: "Nike Air Max 270",
        price: 4499,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      },
      {
        id: "p2",
        name: "Levi's Men 512 Slim Jeans",
        price: 1999,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
      },
      {
        id: "p3",
        name: "Fossil Chronograph Watch",
        price: 7999,
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD123455",
    date: "28 Apr 2026",
    status: "Shipped",
    itemsCount: 2,
    totalAmount: 2798,
    statusSubtitle: "Arriving by Thursday",
    actionText: "Track Order",
    isTracking: true,
    items: [
      {
        id: "p4",
        name: "Checked Casual Shirt",
        price: 1399,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80",
      },
      {
        id: "p5",
        name: "Slim Fit Cotton Chinos",
        price: 1399,
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD123454",
    date: "15 Apr 2026",
    status: "Processing",
    itemsCount: 1,
    totalAmount: 1499,
    statusSubtitle: "Packing items",
    actionText: "View Details",
    isTracking: false,
    items: [
      {
        id: "p6",
        name: "Wireless ANC Headphones",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD123450",
    date: "02 Mar 2026",
    status: "Cancelled",
    itemsCount: 1,
    totalAmount: 899,
    statusSubtitle: "Refund completed to UPI",
    actionText: "View Details",
    isTracking: false,
    items: [
      {
        id: "p7",
        name: "Urban Explorer Backpack",
        price: 899,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
      },
    ],
  },
];

const FILTER_TABS = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

function formatINR(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

function getStatusBadgeStyle(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return {
        bg: "#E8F8EE",
        text: "#15803D",
      };
    case "Shipped":
      return {
        bg: "#EDE9FE",
        text: "#4F46E5",
      };
    case "Processing":
      return {
        bg: "#FEF3C7",
        text: "#D97706",
      };
    case "Cancelled":
      return {
        bg: "#FEE2E2",
        text: "#DC2626",
      };
  }
}

export default function MyOrdersScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [activeTab, setActiveTab] =
    useState<(typeof FILTER_TABS)[number]>("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const filteredOrders = ORDERS_DATA.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((it) =>
        it.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  function handleOrderAction(order: OrderData) {
    setSelectedOrder(order);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Top App Bar ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={AppColors.textPrimary} />
        </TouchableOpacity>

        <AppText style={styles.headerTitle}>My Orders</AppText>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            onPress={() => setSearchOpen(!searchOpen)}
            style={styles.headerActionBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name={searchOpen ? "close" : "search-outline"}
              size={22}
              color={AppColors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Filter Orders",
                "Choose time period:\n• Last 30 days\n• Past 6 months\n• 2026\n• Older"
              )
            }
            style={styles.headerActionBtn}
            activeOpacity={0.7}
          >
            <Ionicons
              name="options-outline"
              size={22}
              color={AppColors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Search Bar (Expandable) ── */}
      {searchOpen && (
        <View style={styles.searchBarWrapper}>
          <Ionicons
            name="search-outline"
            size={18}
            color={AppColors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by order # or product name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ── Filter Pills Bar ── */}
      <View style={styles.filterTabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsScroll}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterPill,
                  isActive ? styles.filterPillActive : styles.filterPillInactive,
                ]}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
              >
                <AppText
                  style={[
                    styles.filterPillText,
                    isActive
                      ? styles.filterPillTextActive
                      : styles.filterPillTextInactive,
                  ]}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Orders List ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.ordersListContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
      >
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cube-outline"
              size={56}
              color={AppColors.onSurfaceVariant}
            />
            <AppText style={styles.emptyTitle}>No orders found</AppText>
            <AppText style={styles.emptySubtitle}>
              You don't have any orders matching "{activeTab}".
            </AppText>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const badgeStyle = getStatusBadgeStyle(order.status);
            return (
              <View key={order.id} style={styles.orderCard}>
                {/* ── Top Row: Order ID & Status Badge ── */}
                <View style={styles.cardHeaderRow}>
                  <AppText style={styles.orderNumberText}>
                    Order #{order.orderNumber}
                  </AppText>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: badgeStyle.bg },
                    ]}
                  >
                    <AppText
                      style={[
                        styles.statusBadgeText,
                        { color: badgeStyle.text },
                      ]}
                    >
                      {order.status}
                    </AppText>
                  </View>
                </View>

                {/* ── Date ── */}
                <AppText style={styles.orderDateText}>{order.date}</AppText>

                {/* ── Middle: Product Thumbnails & Price ── */}
                <View style={styles.cardMiddleRow}>
                  <View style={styles.thumbnailsRow}>
                    {order.items.map((item) => (
                      <View key={item.id} style={styles.thumbnailBox}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.thumbnailImg}
                          resizeMode="cover"
                        />
                      </View>
                    ))}
                  </View>

                  <View style={styles.priceColumn}>
                    <AppText style={styles.itemsCountText}>
                      {order.itemsCount}{" "}
                      {order.itemsCount === 1 ? "item" : "items"}
                    </AppText>
                    <AppText style={styles.priceAmountText}>
                      {formatINR(order.totalAmount)}
                    </AppText>
                  </View>
                </View>

                {/* ── Divider ── */}
                <View style={styles.cardDivider} />

                {/* ── Bottom: Status Subtitle & Action Link ── */}
                <View style={styles.cardFooterRow}>
                  <AppText style={styles.statusSubtitleText}>
                    {order.statusSubtitle}
                  </AppText>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    activeOpacity={0.7}
                    onPress={() => handleOrderAction(order)}
                  >
                    <AppText style={styles.actionBtnText}>
                      {order.actionText}
                    </AppText>
                    <Ionicons
                      name="arrow-forward"
                      size={15}
                      color={AppColors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* ── Order Detail Modal ── */}
      <Modal
        visible={selectedOrder !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <AppText style={styles.modalTitle}>
                  Order #{selectedOrder?.orderNumber}
                </AppText>
                <AppText style={styles.modalSubtitle}>
                  Placed on {selectedOrder?.date}
                </AppText>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedOrder(null)}
                style={styles.modalCloseBtn}
              >
                <Ionicons
                  name="close"
                  size={22}
                  color={AppColors.textPrimary}
                />
              </TouchableOpacity>
            </View>

            {/* Tracking Progress */}
            <View style={styles.trackingBox}>
              <View style={styles.trackingStep}>
                <View
                  style={[styles.stepDot, { backgroundColor: AppColors.primary }]}
                />
                <View style={styles.stepInfo}>
                  <AppText style={styles.stepTitle}>Order Confirmed</AppText>
                  <AppText style={styles.stepTime}>{selectedOrder?.date}</AppText>
                </View>
              </View>
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor:
                      selectedOrder?.status !== "Processing"
                        ? AppColors.primary
                        : "#E5E7EB",
                  },
                ]}
              />
              <View style={styles.trackingStep}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor:
                        selectedOrder?.status === "Shipped" ||
                        selectedOrder?.status === "Delivered"
                          ? AppColors.primary
                          : "#D1D5DB",
                    },
                  ]}
                />
                <View style={styles.stepInfo}>
                  <AppText style={styles.stepTitle}>
                    {selectedOrder?.status === "Delivered"
                      ? "Delivered"
                      : "In Transit"}
                  </AppText>
                  <AppText style={styles.stepTime}>
                    {selectedOrder?.statusSubtitle}
                  </AppText>
                </View>
              </View>
            </View>

            {/* Order Items List */}
            <AppText style={styles.modalSectionTitle}>Items in this Order</AppText>
            <ScrollView style={{ maxHeight: 180 }}>
              {selectedOrder?.items.map((it) => (
                <View key={it.id} style={styles.modalItemRow}>
                  <Image
                    source={{ uri: it.image }}
                    style={styles.modalItemImage}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <AppText style={styles.modalItemName}>{it.name}</AppText>
                    <AppText style={styles.modalItemPrice}>
                      {formatINR(it.price)}
                    </AppText>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Total */}
            <View style={styles.modalTotalRow}>
              <AppText style={styles.modalTotalLabel}>Total Paid:</AppText>
              <AppText style={styles.modalTotalValue}>
                {selectedOrder && formatINR(selectedOrder.totalAmount)}
              </AppText>
            </View>

            <TouchableOpacity
              style={styles.modalDoneBtn}
              onPress={() => setSelectedOrder(null)}
              activeOpacity={0.85}
            >
              <AppText style={styles.modalDoneBtnText}>Done</AppText>
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
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1B22",
    flex: 1,
    marginLeft: 8,
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EDEDF6",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1A1B22",
    padding: 0,
  },
  // ── Filter Tabs ──
  filterTabsContainer: {
    paddingVertical: 6,
    marginBottom: 8,
  },
  filterTabsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: "#17171C",
  },
  filterPillInactive: {
    backgroundColor: "#F3F3FC",
  },
  filterPillText: {
    fontSize: 13,
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  filterPillTextInactive: {
    color: "#474556",
    fontWeight: "500",
  },
  // ── Orders List ──
  ordersListContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 14,
  },
  orderCard: {
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
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumberText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1B22",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  orderDateText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },
  // ── Card Middle ──
  cardMiddleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
  },
  thumbnailsRow: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  thumbnailBox: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  thumbnailImg: {
    width: "100%",
    height: "100%",
  },
  priceColumn: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  itemsCountText: {
    fontSize: 13,
    color: "#6F7078",
    marginBottom: 2,
  },
  priceAmountText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1B22",
  },
  // ── Card Footer ──
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F3FC",
    marginBottom: 12,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusSubtitleText: {
    fontSize: 13,
    color: "#6F7078",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.primary,
  },
  // ── Empty State ──
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1B22",
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6F7078",
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 32,
  },
  // ── Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1B22",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6F7078",
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  trackingBox: {
    backgroundColor: "#FAF8FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  trackingStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 2,
    height: 20,
    marginLeft: 5,
    marginVertical: 4,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1B22",
  },
  stepTime: {
    fontSize: 12,
    color: "#6F7078",
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1B22",
    marginBottom: 10,
  },
  modalItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalItemImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  modalItemName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1A1B22",
  },
  modalItemPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.primary,
    marginTop: 2,
  },
  modalTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EDEDF6",
    paddingTop: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  modalTotalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6F7078",
  },
  modalTotalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1B22",
  },
  modalDoneBtn: {
    backgroundColor: AppColors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalDoneBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
