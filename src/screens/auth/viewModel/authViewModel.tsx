import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { LoginFormData, loginSchema } from "../schema/loginSchema";
import { useLogin } from "../hooks/useLogin";
import { AppToast } from "../../../components/AppToast";
import { AppRouteName, AppStackName } from "../../../navigation/routes";
import { LoginScreenNavProp } from "../../../navigation/types";
import { IAuthRepository } from "../repository/authRepository";

export function useLoginViewModel(repository?: IAuthRepository) {
  const navigation = useNavigation<LoginScreenNavProp>();
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "saran@gmail.com",
      password: "123456",
    },
  });

  const {
    mutate: login,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useLogin(repository);

  // Navigate on success
  useEffect(() => {
    if (isSuccess) {
      navigation.replace(AppStackName.mainBottom);
    }
  }, [isSuccess, navigation]);

  // Show toast on error
  useEffect(() => {
    if (isError && error) {
      AppToast.show(`Login failed: ${error.message}`);
    }
  }, [isError, error]);

  const onLogin = handleSubmit((data) => login(data));
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const navigateToSignUp = () => navigation.navigate(AppRouteName.signupScreen);
  const handleForgotPassword = () =>
    AppToast.show("Forgot password coming soon.");
  const handleBiometricLogin = () =>
    AppToast.show("Biometric login initiated.");
  const handleSocialLogin = (provider: string) =>
    AppToast.show(`Sign in with ${provider} is not configured yet.`);

  return {
    control,
    errors,
    isValid,
    isLoading: isPending,
    error: error?.message,
    isPasswordVisible,
    rememberMe,
    setRememberMe,
    togglePasswordVisibility,
    onLogin,
    navigateToSignUp,
    handleForgotPassword,
    handleBiometricLogin,
    handleSocialLogin,
  };
}

export const authViewModel = useLoginViewModel;
