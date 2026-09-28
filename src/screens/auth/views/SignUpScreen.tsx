import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { SignUpScreenNavProp } from "../../../navigation/types";
import { useLocalization } from "../../../hooks/translation_hooks";
import { useScreenSize } from "../../../helpers/ScreenDimension";
import { AppGap, AppTextStyles, appTextStyles } from "../../../themes";
import { VerticalSpacer } from "../../../components/Spacer";
import AppColors from "../../../themes/colors";
import { AppPadding } from "../../../themes/appPadding";
import AppTextInput from "../../../components/AppTextInput";
import EmailAt from "../../../assets/svg/EmailAt";
import { LockIcon } from "../../../assets/svg/lock";
import { AppRouteName } from "../../../navigation/routes";
import { CheckIcon } from "../../../assets/svg/check";
import AppCheckBox from "../../../components/AppCheckBox";
import TextButton from "../../../components/TextButton";
import AppButton from "../../../components/AppButton";
import TextWithDivider from "../../../components/TextWithDivider";
import { SignInWithCard } from "../../../components/signInCard";
import { GoogleIcon } from "../../../assets/svg/google";
import { AppleIcon } from "../../../assets/svg/apple";
import { useForm } from "react-hook-form";
import AppTextInputController from "../../../components/AppTextInputController";

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavProp>();
  const t = useLocalization();
  const screen = useScreenSize();
  const { control, handleSubmit } = useForm({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
                value={fullName}
                name="fullName"
                control={control}
                onChangeText={setFullName}
                placeHolder={t.FULL_NAME_PLACEHOLDER}
              />

              <AppTextInputController
                title={t.EMAIL_ADDRESS}
                value={email}
                name="fullName"
                control={control}
                onChangeText={setEmail}
                prefix={<EmailAt />}
                keyboardType="email-address"
                autoCapitalize="none"
                placeHolder={t.EMAIL_PLACEHOLDER}
              />

              <AppTextInputController
                title={t.MOBILE_NUMBER}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="number-pad"
                placeHolder={t.MOBILE_PLACEHOLDER}
                name="fullName"
                control={control}
              />

              <AppTextInputController
                title={t.PASSWORD}
                value={password}
                onChangeText={setPassword}
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
                name="fullName"
                control={control}
              />
            </View>

            <VerticalSpacer gap={AppGap.gap12} />

            {/* Paasword Ints */}
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
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <View style={styles.checkBxContainer}>
                <AppCheckBox initialValue={false} onPress={(val) => {}} />
                <View>
                  <AppText style={AppTextStyles.subTitle}>
                    {t.SEND_DISCOUNTS}
                  </AppText>
                </View>
              </View>
              <VerticalSpacer gap={AppGap.gap12} />
              <View style={styles.checkBxContainer}>
                <AppCheckBox initialValue={false} onPress={(val) => {}} />
                <AppText style={AppTextStyles.subTitle}>
                  {t.I_AGREE_TO_SHOPLY}
                </AppText>
                <TextButton
                  textStyle={{ fontSize: 13 }}
                  title={t.TERMS_OF_SERVICE}
                />
                <AppText style={AppTextStyles.subTitle}>and</AppText>
                <TextButton
                  textStyle={{ fontSize: 13 }}
                  title={t.PRIVACY_POLICY}
                />
              </View>
            </View>
            <VerticalSpacer gap={AppGap.gap20} />
            <AppButton title={t.CREATE_ACCOUNT} onPress={() => {}} />
            <TextWithDivider title={t.OR_SIGN_UP_WITH} />
            {/* Social Sign In Options */}
            <View style={styles.signContainer}>
              <SignInWithCard icon={<GoogleIcon />} onPress={() => {}} />
              <SignInWithCard icon={<AppleIcon />} onPress={() => {}} />
              <SignInWithCard
                icon={<Ionicons name="chatbox-ellipses-outline" size={20} />}
                onPress={() => {}}
              />
            </View>
            {/* Sign Up Navigation Option */}
            <View style={styles.dontHaveAccount}>
              <AppText>{t.ALREADY_HAVE_ACCOUNT} </AppText>
              <TextButton
                onPress={() => {
                  navigation.pop();
                }}
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
    flex: 1,
    flexDirection: "row",
    gap: AppGap.gap4,
    alignItems: "center",
  },
  checkBxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: AppGap.gap8,
    alignItems: "center",
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
