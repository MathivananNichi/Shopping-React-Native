import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  Text,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";

const { width, height } = Dimensions.get("window");

const INITIAL_REGION: Region = {
  latitude: 12.9716,
  longitude: 77.5946,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const addressTypes = [
  { id: "home", label: "Home", icon: "home-outline" },
  { id: "work", label: "Work", icon: "briefcase-outline" },
  { id: "other", label: "Other", icon: "location-outline" },
] as const;

import * as Location from "expo-location";

const getCurrentLocation =
  async (): Promise<Location.LocationObject | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    console.log("Latitude:", location.coords.latitude);
    console.log("Longitude:", location.coords.longitude);
    return location;
  };

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Pure UI state (no active business logic)
  const [selectedTag, setSelectedTag] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    const getLocation = async () => {
      const result = await getCurrentLocation();
      if (result) {
        setRegion({
          latitude: result?.coords.latitude,
          longitude: result?.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    getLocation();
  }, []);
  useEffect(() => {
    if (!region) return;

    mapRef.current?.animateToRegion(
      {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
  }, [region]);
  return (
    <View style={styles.container}>
      {/* ─── MAP VIEW ─── */}
      <MapView
        ref={mapRef}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onPress={(vals) => {
          const data = {
            latitude: vals.nativeEvent.coordinate.latitude,
            longitude: vals.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          console.log("Latitude:", data.latitude);
          console.log("Longitude:", data.longitude);
          setRegion(data);
        }}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker coordinate={region} title="My Location">
          <Text style={styles.icon}>📍</Text>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  map: {
    width: width,
    height: height,
  },

  /* Marker */
  markerContainer: {
    alignItems: "center",
  },
  markerBadge: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerBadgeText: {
    color: AppColors.onPrimary,
    fontSize: 11,
    fontWeight: "700",
  },
  markerPin: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: -2,
  },

  /* Top Bar */
  topBar: {
    position: "absolute",
    left: AppPadding.padding16,
    right: AppPadding.padding16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  searchBox: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: AppColors.textPrimary,
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
  },

  /* Floating action buttons */
  floatingActions: {
    position: "absolute",
    right: AppPadding.padding16,
    gap: 12,
    zIndex: 10,
  },
  fabBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  gpsBtn: {
    backgroundColor: AppColors.surfaceContainerLowest,
  },

  /* Bottom Sheet */
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: AppPadding.padding16,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.surfaceContainerHighest,
    alignSelf: "center",
    marginBottom: 12,
  },
  locationHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  locationTitleBox: {
    flex: 1,
  },
  locationHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.textPrimary,
    marginBottom: 3,
  },
  locationSubheading: {
    fontSize: 12,
    color: AppColors.textSecondary,
    lineHeight: 17,
  },
  changeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.primary,
  },

  /* Tags */
  tagSection: {
    marginTop: 16,
  },
  tagSectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: AppColors.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    gap: 10,
  },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.surfaceContainerLow,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  tagPillActive: {
    backgroundColor: AppColors.onPrimaryContainer,
    borderColor: AppColors.primary,
  },
  tagPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  tagPillTextActive: {
    color: AppColors.primary,
  },

  /* Confirm Button */
  confirmBtn: {
    marginTop: 18,
    backgroundColor: AppColors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: AppColors.onPrimary,
  },
  marker: {
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",

    // shadow
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  icon: {
    fontSize: 24,
  },
});
