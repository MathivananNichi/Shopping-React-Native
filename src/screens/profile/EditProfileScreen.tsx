import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AppView from "../../components/AppView";
import AppText from "../../components/AppText";
import AppColors from "../../themes/colors";
import { AppPadding } from "../../themes/appPadding";
import { useNavigation } from "@react-navigation/native";
import { ContainerStyle } from "../../themes/containerStyle";
import TouchableOpacityView from "../../components/AppTouchable";
import { appSizes } from "../../themes";

// ────────────────────────────────────────────────────────────────────────────
// Reusable floating-label input (UI only – no form controller wired)
// ────────────────────────────────────────────────────────────────────────────
interface EditFieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  icon: React.ReactNode;
  keyboardType?: TextInput["props"]["keyboardType"];
  editable?: boolean;
  multiline?: boolean;
}

interface ImageResult {
  success: boolean;
  imagePath?: ImagePicker.ImagePickerAsset | null;
  message?: string | null;
}

function EditField({
  label,
  value,
  onChangeText,
  icon,
  keyboardType,
  editable = true,
  multiline = false,
}: EditFieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <View
      style={[
        fieldStyles.wrapper,
        focused && fieldStyles.wrapperFocused,
        !editable && fieldStyles.wrapperDisabled,
      ]}
    >
      <View style={fieldStyles.iconBox}>{icon}</View>

      <View style={fieldStyles.body}>
        <AppText
          style={[
            fieldStyles.label,
            active && fieldStyles.labelActive,
            focused && { color: AppColors.primary },
          ]}
        >
          {label}
        </AppText>

        <TextInput
          style={[fieldStyles.input, multiline && { minHeight: 60 }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          placeholderTextColor={AppColors.outline}
          selectionColor={AppColors.primary}
        />
      </View>

      {!editable && (
        <Ionicons
          name="lock-closed-outline"
          size={16}
          color={AppColors.outline}
          style={{ marginRight: 4 }}
        />
      )}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Gender selector pill group (UI only)
// ────────────────────────────────────────────────────────────────────────────
const genderOptions = ["Male", "Female", "Other"] as const;

function GenderSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (g: string) => void;
}) {
  return (
    <View style={genderStyles.container}>
      <AppText style={genderStyles.label}>Gender</AppText>
      <View style={genderStyles.pillRow}>
        {genderOptions.map((g) => {
          const isActive = selected === g;
          return (
            <TouchableOpacity
              key={g}
              activeOpacity={0.7}
              onPress={() => onSelect(g)}
              style={[genderStyles.pill, isActive && genderStyles.pillActive]}
            >
              <View
                style={[
                  genderStyles.radio,
                  isActive && genderStyles.radioActive,
                ]}
              >
                {isActive && <View style={genderStyles.radioDot} />}
              </View>
              <AppText
                style={[
                  genderStyles.pillText,
                  isActive && genderStyles.pillTextActive,
                ]}
              >
                {g}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function useImagePicker() {
  const openCamera = async (): Promise<ImageResult> => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return { success: false, message: "Give permission to open camera" };
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (result.canceled) {
      return { success: false, message: "User cancelled the process" };
    }
    return {
      success: true,
      message: "User cancelled the process",
      imagePath: result.assets[0],
    };
  };

  const openGallery = async (): Promise<ImageResult> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return { success: false, message: "Give permission to open Gallery" };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 0.8,
    });

    if (result.canceled) {
      return { success: false, message: "Give permission to open camera" };
    }
    return {
      success: true,
      message: "User cancelled the process",
      imagePath: result.assets[0],
    };
  };

  return {
    openCamera,
    openGallery,
  };
}

// ════════════════════════════════════════════════════════════════════════════
//  EDIT PROFILE SCREEN
// ════════════════════════════════════════════════════════════════════════════
export default function EditProfileScreen() {
  const navigation = useNavigation();

  // Local UI state – no persistence / API calls
  const [firstName, setFirstName] = useState("Saran");
  const [lastName, setLastName] = useState("S");
  const [email, setEmail] = useState("saran.s@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [dateOfBirth, setDateOfBirth] = useState("15 / 08 / 1995");
  const [gender, setGender] = useState("Male");
  const [bio, setBio] = useState("");
  const [isDialog, showDialog] = useState(false);

  const [imagePath, setImage] = useState<string | null | undefined>(null);
  const { openCamera, openGallery } = useImagePicker();

  return (
    <AppView style={{ padding: 0 }}>
      <Modal
        visible={isDialog}
        transparent
        animationType="fade"
        onRequestClose={() => showDialog(false)}
      >
        <Pressable style={modelStyle.overlay} onPress={() => showDialog(false)}>
          <Pressable
            style={modelStyle.dialog}
            onPress={(event) => event.stopPropagation()}
          >
            <TouchableOpacityView
              onPress={async () => {
                const result = await openCamera();
                showDialog(false);
                const path = result.imagePath?.uri;
                console.log("ddddddddddd", path);

                setImage(result.imagePath?.uri);
              }}
            >
              <Ionicons name="camera" size={30} />
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={async () => {
                const result = await openGallery();
                showDialog(false);
                const path = result.imagePath?.uri;
                console.log("ddddddddddd", path);

                setImage(result.imagePath?.uri);
              }}
            >
              <Ionicons name="image" size={30} />
            </TouchableOpacityView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={AppColors.textPrimary} />
        </TouchableOpacity>

        <AppText style={styles.headerTitle}>Edit Profile</AppText>

        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="checkmark" size={24} color={AppColors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ─── Avatar Section ─── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              {imagePath == null ? (
                <Ionicons name="person" size={44} color={AppColors.primary} />
              ) : (
                <Image
                  src={imagePath}
                  width={100}
                  height={100}
                  style={{ borderRadius: appSizes.borderRadiusRound }}
                />
              )}
            </View>
            <TouchableOpacityView
              style={styles.cameraBtn}
              onPress={() => showDialog(true)}
            >
              <Ionicons name="camera" size={16} color={AppColors.onPrimary} />
            </TouchableOpacityView>
          </View>
          <AppText style={styles.avatarHint}>Tap to change photo</AppText>
        </View>

        {/* ─── Form Fields ─── */}
        <View style={styles.formCard}>
          <AppText style={styles.sectionLabel}>PERSONAL DETAILS</AppText>

          <EditField
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color={AppColors.primary}
              />
            }
          />

          <EditField
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color={AppColors.primary}
              />
            }
          />

          <EditField
            label="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            icon={
              <MaterialIcons
                name="short-text"
                size={20}
                color={AppColors.primary}
              />
            }
          />
        </View>

        <View style={styles.formCard}>
          <AppText style={styles.sectionLabel}>CONTACT INFORMATION</AppText>

          <EditField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={
              <Ionicons
                name="mail-outline"
                size={20}
                color={AppColors.primary}
              />
            }
          />

          <EditField
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={false}
            icon={
              <Ionicons
                name="call-outline"
                size={20}
                color={AppColors.primary}
              />
            }
          />
        </View>

        <View style={styles.formCard}>
          <AppText style={styles.sectionLabel}>ADDITIONAL INFO</AppText>

          <EditField
            label="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            icon={
              <Ionicons
                name="calendar-outline"
                size={20}
                color={AppColors.primary}
              />
            }
          />

          <GenderSelector selected={gender} onSelect={setGender} />
        </View>

        {/* ─── Save Button ─── */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <AppText style={styles.saveBtnText}>Save Changes</AppText>
        </TouchableOpacity>

        {/* ─── Delete Account ─── */}
        <TouchableOpacity style={styles.deleteRow} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={18} color={AppColors.error} />
          <AppText style={styles.deleteText}>Delete Account</AppText>
        </TouchableOpacity>
      </ScrollView>
    </AppView>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STYLES
// ════════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  /* ── Header ── */
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
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppColors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },

  scrollContent: {
    paddingBottom: 48,
  },

  /* ── Avatar ── */
  avatarSection: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  avatarOuter: {
    position: "relative",
  },
  avatarInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AppColors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: AppColors.primary,
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: AppColors.background,
  },
  avatarHint: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: AppColors.textSecondary,
  },

  /* ── Form Card ── */
  formCard: {
    backgroundColor: AppColors.surfaceContainerLowest,
    marginHorizontal: AppPadding.padding16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: AppColors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 2,
  },

  /* ── Save Button ── */
  saveBtn: {
    marginHorizontal: AppPadding.padding16,
    marginTop: 24,
    backgroundColor: AppColors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: AppColors.onPrimary,
    letterSpacing: 0.3,
  },

  /* ── Delete Account ── */
  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
    marginBottom: 8,
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.error,
  },
});

// ── EditField styles ──
const fieldStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
  },
  wrapperFocused: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.surfaceContainerLowest,
  },
  wrapperDisabled: {
    opacity: 0.65,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: AppColors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  body: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: AppColors.textSecondary,
    marginBottom: 0,
  },
  labelActive: {
    fontSize: 11,
  },
  input: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.textPrimary,
    paddingVertical: Platform.OS === "ios" ? 4 : 2,
    paddingHorizontal: 0,
    textAlignVertical: "top",
  },
});

// ── GenderSelector styles ──
const genderStyles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: AppColors.textSecondary,
    marginLeft: 4,
  },
  pillRow: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: AppColors.surfaceContainerLow,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  pillActive: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.onPrimaryContainer,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },
  pillTextActive: {
    color: AppColors.primary,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: AppColors.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: AppColors.primary,
  },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: AppColors.primary,
  },
});

const modelStyle = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  dialog: {
    width: "70%",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    // maxHeight: "80%",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
});
