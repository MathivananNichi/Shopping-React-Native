import { useState, useCallback } from "react";
import { useForm, Control, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { container } from "tsyringe";
import { SignUpFormData, signUpSchema } from "../schema/signUpSchema";
import { useSignUp } from "../hooks/useSignUp";
import { AppToast } from "../../../components/AppToast";
import { AppRouteName } from "../../../navigation/routes";
import { SignUpScreenNavProp } from "../../../navigation/types";
import { IAuthRepository } from "../repository/authRepository";
import { DI_TOKENS } from "../../../di/tokens";

/**
 * UI State exposed by SignUp ViewModel
 */
export interface SignUpViewState {
  readonly control: Control<SignUpFormData>;
  readonly errors: FieldErrors<SignUpFormData>;
  readonly isValid: boolean;
  readonly isLoading: boolean;
  readonly isPasswordVisible: boolean;
  readonly agreeToTerms: boolean;
  readonly sendDiscounts: boolean;
  readonly errorMessage: string | null;
}

/**
 * User Intents & Actions handled by SignUp ViewModel
 */
export interface SignUpViewActions {
  handleSignUp: () => void;
  togglePasswordVisibility: () => void;
  toggleAgreeToTerms: (value: boolean) => void;
  toggleSendDiscounts: (value: boolean) => void;
  navigateToLogin: () => void;
  navigateToTerms: () => void;
  navigateToPrivacy: () => void;
  handleSocialSignUp: (provider: "google" | "apple" | "other") => void;
}

/**
 * Contract for SignUp ViewModel
 */
export interface ISignUpViewModel {
  state: SignUpViewState;
  actions: SignUpViewActions;
  // Flattened bindings for flexible usage & backwards compatibility
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  isValid: boolean;
  isLoading: boolean;
  isPasswordVisible: boolean;
  agreeToTerms: boolean;
  sendDiscounts: boolean;
  errorMessage: string | null;
  error?: string;
  onSignUp: () => void;
  togglePasswordVisibility: () => void;
  toggleAgreeToTerms: (value: boolean) => void;
  toggleSendDiscounts: (value: boolean) => void;
  navigateToLogin: () => void;
  navigateToTerms: () => void;
  navigateToPrivacy: () => void;
  handleSocialSignUp: (provider: "google" | "apple" | "other") => void;
}

/**
 * Senior MVVM Implementation - SignUp ViewModel
 * Encapsulates presentation logic, UI state, form bindings, and API repository operations.
 */
export function useSignUpViewModel(
  repository: IAuthRepository = container.resolve<IAuthRepository>(
    DI_TOKENS.AuthRepository
  ),
  nav?: SignUpScreenNavProp
): ISignUpViewModel {
  const defaultNavigation = useNavigation<SignUpScreenNavProp>();
  const navigation = nav ?? defaultNavigation;

  // Local UI State
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Form Management
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      agreeToTerms: false,
      sendDiscounts: false,
    },
  });

  const agreeToTerms = Boolean(watch("agreeToTerms"));
  const sendDiscounts = Boolean(watch("sendDiscounts"));

  // Repository Hook
  const { mutate: signUp, isPending, error } = useSignUp(repository);

  // Actions
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleAgreeToTerms = useCallback(
    (value: boolean) => {
      setValue("agreeToTerms", value, { shouldValidate: true });
    },
    [setValue]
  );

  const toggleSendDiscounts = useCallback(
    (value: boolean) => {
      setValue("sendDiscounts", value, { shouldValidate: true });
    },
    [setValue]
  );

  const navigateToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToTerms = useCallback(() => {
    AppToast.show("Terms of Service pressed.");
  }, []);

  const navigateToPrivacy = useCallback(() => {
    AppToast.show("Privacy Policy pressed.");
  }, []);

  const handleSocialSignUp = useCallback(
    (provider: "google" | "apple" | "other") => {
      AppToast.show(`Sign up with ${provider} is not configured yet.`);
    },
    []
  );

  const handleSignUp = handleSubmit((formData: SignUpFormData) => {
    signUp(
      {
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      },
      {
        onSuccess: (res) => {
          AppToast.show(
            res.message || "Account created successfully! Please sign in."
          );
          navigation.navigate(AppRouteName.loginScreen);
        },
        onError: (err: any) => {
          AppToast.show(err.message || "Sign up failed. Please try again.");
        },
      }
    );
  });

  const state: SignUpViewState = {
    control,
    errors,
    isValid,
    isLoading: isPending,
    isPasswordVisible,
    agreeToTerms,
    sendDiscounts,
    errorMessage: error?.message ?? null,
  };

  const actions: SignUpViewActions = {
    handleSignUp,
    togglePasswordVisibility,
    toggleAgreeToTerms,
    toggleSendDiscounts,
    navigateToLogin,
    navigateToTerms,
    navigateToPrivacy,
    handleSocialSignUp,
  };

  return {
    state,
    actions,
    // Flattened bindings
    control,
    errors,
    isValid,
    isLoading: isPending,
    isPasswordVisible,
    agreeToTerms,
    sendDiscounts,
    errorMessage: error?.message ?? null,
    error: error?.message,
    onSignUp: handleSignUp,
    togglePasswordVisibility,
    toggleAgreeToTerms,
    toggleSendDiscounts,
    navigateToLogin,
    navigateToTerms,
    navigateToPrivacy,
    handleSocialSignUp,
  };
}

export const signUpViewModel = useSignUpViewModel;
