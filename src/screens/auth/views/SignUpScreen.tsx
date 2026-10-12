import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppView from "../../../components/AppView";
import AppText from "../../../components/AppText";
import { useLocalization } from "../../../hooks/translation_hooks";
import { useScreenSize } from "../../../helpers/ScreenDimension";
import { AppGap, AppTextStyles, appTextStyles } from "../../../themes";
import { VerticalSpacer } from "../../../components/Spacer";
import AppColors from "../../../themes/colors";
import { AppPadding } from "../../../themes/appPadding";
import EmailAt from "../../../assets/svg/EmailAt";
import { LockIcon } from "../../../assets/svg/lock";
import { CheckIcon } from "../../../assets/svg/check";
import AppCheckBox from "../../../components/AppCheckBox";
import TextButton from "../../../components/TextButton";
import AppButton from "../../../components/AppButton";
import TextWithDivider from "../../../components/TextWithDivider";
import { SignInWithCard } from "../../../components/signInCard";
import { GoogleIcon } from "../../../assets/svg/google";
import { AppleIcon } from "../../../assets/svg/apple";
import AppTextInputController from "../../../components/AppTextInputController";
import { useSignUpViewModel } from "../viewModel/signUpViewModel";

/**
 * SignUpScreen (Dumb View in MVVM Pattern)
 * Renders the registration interface and delegates state and interactions to useSignUpViewModel.
 */
export default function SignUpScreen() {
  const {
    control,
    errors,
    isLoading,
    isPasswordVisible,
    agreeToTerms,
    sendDiscounts,
    onSignUp,
    togglePasswordVisibility,
    toggleAgreeToTerms,
    toggleSendDiscounts,
    navigateToLogin,
    navigateToTerms,
    navigateToPrivacy,
    handleSocialSignUp,
  } = useSignUpViewModel();

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
          <View
            style={[styles.content, { marginTop: screen.screenWidth * 0.05 }]}
          >
            {/* Title & Subtitle */}
            <AppText
              style={[appTextStyles.heading, { color: AppColors.onSurface }]}
            >
              {`${t.CREATE_AN_ACCOUNT} ✨`}
            </AppText>

            <VerticalSpacer gap={AppGap.gap4} />

            <View style={styles.subtitleContainer}>
              <AppText style={appTextStyles.signInSubTitle}>
                {t.SIGN_UP_SUBTITLE}
              </AppText>
            </View>

            <VerticalSpacer gap={AppGap.gap20} />

            {/* Sign up fields */}
            <View style={styles.formContainer}>
              <AppTextInputController
                title={t.FULL_NAME}
                name="fullName"
                control={control}
                autoCapitalize="words"
                placeHolder={t.FULL_NAME_PLACEHOLDER}
              />

              <AppTextInputController
                title={t.EMAIL_ADDRESS}
                name="email"
                control={control}
                prefix={<EmailAt />}
                keyboardType="email-address"
                autoCapitalize="none"
                placeHolder={t.EMAIL_PLACEHOLDER}
              />

              <AppTextInputController
                title={t.MOBILE_NUMBER}
                name="mobileNumber"
                control={control}
                keyboardType="phone-pad"
                placeHolder={t.MOBILE_PLACEHOLDER}
              />

              <AppTextInputController
                title={t.PASSWORD}
                name="password"
                control={control}
                prefix={<LockIcon />}
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
            </View>

            <VerticalSpacer gap={AppGap.gap12} />

            {/* Password Hint */}
            <View style={styles.rowCondition}>
              <CheckIcon />
              <AppText
                style={[
                  AppTextStyles.passwordHint,
                  { flexWrap: "wrap", flex: 1 },
                ]}
              >
                {t.PASSWORD_HINT}
              </AppText>
            </View>

            <VerticalSpacer gap={AppGap.gap12} />

            {/* Checkboxes & Policies */}
            <View style={{ alignItems: "flex-start", width: "100%" }}>
              <View style={styles.checkBxContainer}>
                <AppCheckBox
                  initialValue={sendDiscounts}
                  onPress={toggleSendDiscounts}
                />
                <View style={{ flex: 1 }}>
                  <AppText style={AppTextStyles.subTitle}>
                    {t.SEND_DISCOUNTS}
                  </AppText>
                </View>
              </View>

              <VerticalSpacer gap={AppGap.gap12} />

              <View style={styles.checkBxContainer}>
                <AppCheckBox
                  initialValue={agreeToTerms}
                  onPress={toggleAgreeToTerms}
                />
                <View style={styles.termsRow}>
                  <AppText style={AppTextStyles.subTitle}>
                    {t.I_AGREE_TO_SHOPLY}{" "}
                  </AppText>
                  <TextButton
                    textStyle={{ fontSize: 13 }}
                    title={t.TERMS_OF_SERVICE}
                    onPress={navigateToTerms}
                  />
                  <AppText style={AppTextStyles.subTitle}> and </AppText>
                  <TextButton
                    textStyle={{ fontSize: 13 }}
                    title={t.PRIVACY_POLICY}
                    onPress={navigateToPrivacy}
                  />
                </View>
              </View>

              {errors.agreeToTerms && (
                <AppText style={styles.errorText}>
                  {errors.agreeToTerms.message}
                </AppText>
              )}
            </View>

            <VerticalSpacer gap={AppGap.gap20} />

            {/* Submit Button */}
            <AppButton
              title={t.CREATE_ACCOUNT}
              onPress={onSignUp}
              isLoading={isLoading}
            />

            <TextWithDivider title={t.OR_SIGN_UP_WITH} />

            {/* Social Sign In Options */}
            <View style={styles.signContainer}>
              <SignInWithCard
                icon={<GoogleIcon />}
                onPress={() => handleSocialSignUp("google")}
              />
              <SignInWithCard
                icon={<AppleIcon />}
                onPress={() => handleSocialSignUp("apple")}
              />
              <SignInWithCard
                icon={<Ionicons name="chatbox-ellipses-outline" size={20} />}
                onPress={() => handleSocialSignUp("other")}
              />
            </View>

            {/* Already have an account */}
            <View style={styles.dontHaveAccount}>
              <AppText>{t.ALREADY_HAVE_ACCOUNT} </AppText>
              <TextButton
                onPress={navigateToLogin}
                title={t.SIGN_IN}
              />
            </View>
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
    padding: AppPadding.padding16,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: AppPadding.padding20,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  subtitleContainer: {
    paddingHorizontal: AppPadding.padding16,
  },
  formContainer: {
    width: "100%",
    gap: AppGap.gap12,
  },
  rowCondition: {
    width: "100%",
    flexDirection: "row",
    gap: AppGap.gap4,
    alignItems: "center",
  },
  checkBxContainer: {
    flexDirection: "row",
    gap: AppGap.gap8,
    alignItems: "flex-start",
    width: "100%",
  },
  termsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    color: AppColors.onErrorContainer,
    marginTop: 4,
    marginLeft: 24,
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
