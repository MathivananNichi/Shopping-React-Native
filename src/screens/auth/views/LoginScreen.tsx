import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppView from "../../../components/AppView";
import AppText from "../../../components/AppText";
import AppButton from "../../../components/AppButton";
import AppCheckBox from "../../../components/AppCheckBox";
import TextButton from "../../../components/TextButton";
import { HorizontalSpacer, VerticalSpacer } from "../../../components/Spacer";

import { CheckIcon } from "../../../assets/svg/check";
import { LockIcon } from "../../../assets/svg/lock";
import EmailAt from "../../../assets/svg/EmailAt";

import { useLocalization } from "../../../hooks/translation_hooks";
import { useScreenSize } from "../../../helpers/ScreenDimension";
import {
  AppGap,
  appSizes,
  appTextStyles,
  AppTextStyles,
} from "../../../themes";
import AppColors from "../../../themes/colors";
import { AppPadding } from "../../../themes/appPadding";
import { FingerPrint } from "../../../assets/svg/fingerPrint";
import { GoogleIcon } from "../../../assets/svg/google";
import { AppleIcon } from "../../../assets/svg/apple";
import TouchableOpacityView from "../../../components/AppTouchable";
import { SignInWithCard } from "../../../components/signInCard";
import TextWithDivider from "../../../components/TextWithDivider";
import AppTextInputController from "../../../components/AppTextInputController";
import { useLoginViewModel } from "../viewModel/authViewModel";

/**
 * LoginScreen (Dumb View in MVVM Pattern)
 * Strictly renders the UI and delegates all state and intents to useLoginViewModel.
 */
export default function LoginScreen() {
  const {
    control,
    isLoading,
    isPasswordVisible,
    rememberMe,
    onLogin,
    togglePasswordVisibility,
    setRememberMe,
    navigateToSignUp,
    handleForgotPassword,
    handleBiometricLogin,
    handleSocialLogin,
  } = useLoginViewModel();

  const t = useLocalization();
  const screen = useScreenSize();

  return (
    <AppView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Lifestyle Badge */}
          <View
            style={[
              styles.lifeStyleBadge,
              { marginTop: screen.screenWidth * 0.08 },
            ]}
          >
            <CheckIcon />
            <AppText style={AppTextStyles.lifeStore}>
              {t.CURATED_LIFESTYLE_STORE}
            </AppText>
          </View>

          <VerticalSpacer gap={AppGap.gap8} />

          {/* Title & Subtitle */}
          <AppText
            style={[appTextStyles.heading, { color: AppColors.onSurface }]}
          >
            {`${t.WELCOME_BACK} 👋`}
          </AppText>

          <VerticalSpacer gap={AppGap.gap4} />

          <View style={styles.subtitleContainer}>
            <AppText style={appTextStyles.signInSubTitle}>
              {t.SIGN_IN_SUBTITLE}
            </AppText>
          </View>

          <VerticalSpacer gap={AppGap.gap20} />

          {/* Email Input */}
          <AppTextInputController
            keyboardType="email-address"
            autoCapitalize="none"
            prefix={<EmailAt />}
            control={control}
            title={t.EMAIL_OR_PHONE}
            name={"email"}
          />

          <VerticalSpacer gap={AppGap.gap16} />

          {/* Password Input */}
          <AppTextInputController
            name={"password"}
            control={control}
            prefix={<LockIcon />}
            title={t.PASSWORD}
            secureTextEntry={!isPasswordVisible}
            suffix={
              <Ionicons
                onPress={togglePasswordVisibility}
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color={AppColors.onSurfaceVariant}
              />
            }
            placeHolder={t.PASSWORD}
          />

          <VerticalSpacer gap={AppGap.gap20} />

          {/* Remember Me & Forgot Password Row */}
          <View style={styles.rememberRow}>
            <AppCheckBox onPress={setRememberMe} initialValue={rememberMe} />
            <HorizontalSpacer gap={AppGap.gap4} />
            <AppText style={styles.rememberText}>{t.REMEMBER_ME}</AppText>
            <TextButton onPress={handleForgotPassword} title={t.FORGOT_PASSWORD} />
          </View>

          <VerticalSpacer gap={AppGap.gap20} />

          {/* Sign In Button */}
          <AppButton
            style={styles.signInButton}
            title={t.SIGN_IN_TO_SHOPLY}
            isLoading={isLoading}
            onPress={onLogin}
          />
          <VerticalSpacer gap={AppGap.gap20} />

          {/* Biometric Fingerprint Button */}
          <TouchableOpacityView
            style={styles.useFingerPrint}
            onPress={handleBiometricLogin}
          >
            <View style={styles.fingerPrintContainer}>
              <FingerPrint />
            </View>
            <AppText style={AppTextStyles.fingerPrint}>
              {t.UNLOCK_WITH_BIOMETRICS}
            </AppText>
          </TouchableOpacityView>

          {/* Divider */}
          <TextWithDivider title={t.OR_CONTINUE_WITH} />

          {/* Social Sign In Options */}
          <View style={styles.signContainer}>
            <SignInWithCard
              icon={<GoogleIcon />}
              onPress={() => handleSocialLogin("google")}
            />
            <SignInWithCard
              icon={<AppleIcon />}
              onPress={() => handleSocialLogin("apple")}
            />
            <SignInWithCard
              icon={<Ionicons name="chatbox-ellipses-outline" size={20} />}
              onPress={() => handleSocialLogin("other")}
            />
          </View>

          {/* Sign Up Navigation Option */}
          <View style={styles.dontHaveAccount}>
            <AppText>{t.DONT_HAVE_ACCOUNT} </AppText>
            <TextButton
              onPress={navigateToSignUp}
              title={t.SIGN_UP}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    padding: AppPadding.padding16,
    paddingBottom: AppPadding.padding20,
  },
  lifeStyleBadge: {
    flexDirection: "row",
    gap: AppGap.gap4,
    elevation: 2,
    borderRadius: appSizes.borderRadiusXl,
    paddingHorizontal: AppPadding.padding8,
    paddingVertical: AppPadding.padding4,
    backgroundColor: AppColors.primaryFixed,
    alignSelf: "center",
    alignItems: "center",
  },
  subtitleContainer: {
    paddingHorizontal: AppPadding.padding16,
  },
  rememberRow: {
    flexDirection: "row",
    gap: AppGap.gap2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  rememberText: {
    flex: 1,
  },
  signInButton: {
    width: "100%",
  },
  useFingerPrint: {
    gap: AppGap.gap6,
    flexDirection: "row",
    backgroundColor: AppColors.surfaceContainer,
    paddingHorizontal: AppPadding.padding16,
    paddingVertical: AppPadding.padding12,
    borderRadius: appSizes.borderRadiusRound,
    justifyContent: "center",
    alignItems: "center",
  },
  fingerPrintContainer: {
    borderRadius: appSizes.borderRadiusRound,
    backgroundColor: AppColors.primary,
    padding: AppPadding.padding6,
  },
  signContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  dontHaveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
});
