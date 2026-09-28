import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AppView from "../../components/AppView";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AppRouteName } from "../../navigation/routes";

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <AppText style={styles.sectionHeaderText}>{title}</AppText>
    </View>
  );
}

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  onPress?: () => void;
  isLast?: boolean;
}

function MenuRow({ icon, label, badge, onPress, isLast }: MenuRowProps) {
  return (
    <TouchableOpacity
      style={[styles.menuRow, isLast && styles.menuRowLast]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={styles.menuRowLeft}>
        <View style={styles.menuRowIcon}>{icon}</View>
        <AppText style={styles.menuRowLabel}>{label}</AppText>
      </View>
      <View style={styles.menuRowRight}>
        {badge !== undefined && (
          <View style={styles.badgeContainer}>
            <AppText style={styles.badgeText}>{badge}</AppText>
          </View>
        )}
        <Ionicons
          name="chevron-forward"
          size={18}
          color={AppColors.onSurfaceVariant}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  return (
    <AppView style={{ padding: 0 }}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>Profile</AppText>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Ionicons
              name="settings-outline"
              size={22}
              color={AppColors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <View>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={AppColors.textPrimary}
              />
              <View style={styles.notifDot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <TouchableOpacity style={styles.userCard} activeOpacity={0.75}>
          <View style={styles.avatarFallback}>
            <Ionicons name="person" size={30} color={AppColors.primary} />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <AppText style={styles.userName}>Saran S</AppText>
              <View style={styles.plusBadge}>
                <AppText style={styles.plusBadgeText}>PLUS</AppText>
              </View>
            </View>
            <AppText style={styles.userPhone}>+91 98765 43210</AppText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={AppColors.onSurfaceVariant}
          />
        </TouchableOpacity>

        {/* Shopty Club Banner - fixed: no zero coords, explicit locations */}
        <LinearGradient
          colors={["#532CE6", "#6C4DFF"]}
          start={{ x: 0.001, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 1]}
          style={styles.clubBanner}
        >
          <View style={styles.clubLeft}>
            <View style={styles.clubIconCircle}>
              <Ionicons name="star" size={18} color={AppColors.primary} />
            </View>
            <View style={styles.clubTextBlock}>
              <AppText style={styles.clubTitle}>Shopty Club Member</AppText>
              <AppText style={styles.clubSubtitle}>
                550 Coins available to redeem
              </AppText>
            </View>
          </View>
          <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8}>
            <AppText style={styles.exploreBtnText}>Explore</AppText>
          </TouchableOpacity>
        </LinearGradient>

        {/* My Account */}
        <SectionHeader title="MY ACCOUNT" />
        <View style={styles.menuCard}>
          <MenuRow
            icon={
              <Ionicons
                name="receipt-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="My Orders"
            badge="3 Active"
            onPress={() => {
              const rootNav = navigation.getParent() || navigation;
              rootNav.navigate(AppRouteName.myOrders);
            }}
          />
          <MenuRow
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Personal Information"
          />
          <MenuRow
            icon={
              <Ionicons
                name="location-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Address Book"
            badge="2 Saved"
          />
          <MenuRow
            icon={
              <Ionicons
                name="card-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Payment Methods"
          />
          <MenuRow
            icon={
              <Ionicons
                name="heart-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Wishlist"
            badge={14}
          />
          <MenuRow
            icon={
              <MaterialIcons
                name="history"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Recently Viewed"
            isLast
          />
        </View>

        {/* Support */}
        <SectionHeader title="SUPPORT" />
        <View style={styles.menuCard}>
          <MenuRow
            icon={
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Help Center"
          />
          <MenuRow
            icon={
              <Ionicons
                name="mail-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="Contact Us"
          />
          <MenuRow
            icon={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={AppColors.primary}
              />
            }
            label="About Us"
            isLast
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert("Logout", "Are you sure you want to logout?")
          }
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={AppColors.error}
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <AppText style={styles.logoutText}>Logout</AppText>
        </TouchableOpacity>

        <AppText style={styles.versionText}>
          Shopty App • Version 2.14.0 (Build 4082)
        </AppText>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppColors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.error,
    borderWidth: 1.5,
    borderColor: AppColors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surfaceContainerLowest,
    marginHorizontal: AppPadding.padding16,
    marginTop: 16,
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarFallback: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AppColors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: AppColors.primary,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  plusBadge: {
    backgroundColor: AppColors.primary,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  plusBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: AppColors.onPrimary,
    letterSpacing: 0.5,
  },
  userPhone: {
    fontSize: 13,
    color: AppColors.textSecondary,
    fontWeight: "400",
  },
  clubBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: AppPadding.padding16,
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  clubLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  clubIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.onPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  clubTextBlock: {
    flex: 1,
  },
  clubTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: AppColors.onPrimary,
  },
  clubSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
    marginTop: 1,
  },
  exploreBtn: {
    backgroundColor: AppColors.onPrimary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  exploreBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: AppColors.primary,
  },
  sectionHeader: {
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 20,
    paddingBottom: 6,
  },
  sectionHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.textSecondary,
    letterSpacing: 1.2,
  },
  menuCard: {
    backgroundColor: AppColors.surfaceContainerLowest,
    marginHorizontal: AppPadding.padding16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.surfaceContainerHighest,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: AppColors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuRowLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.textPrimary,
  },
  menuRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeContainer: {
    backgroundColor: AppColors.surfaceContainerHighest,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: AppPadding.padding16,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: AppColors.errorContainer,
    borderWidth: 1,
    borderColor: "rgba(186,26,26,0.15)",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.error,
  },
  versionText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 11,
    color: AppColors.textSecondary,
    fontWeight: "400",
  },
});