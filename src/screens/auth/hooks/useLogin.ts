import {
  useMutation,
  UseMutationOptions,
  DefaultError,
} from "@tanstack/react-query";
import { container } from "tsyringe";
import { useAppDispatch } from "../../../store/hooks";
import { sessionSet } from "../store/authSlice";
import { IAuthRepository } from "../repository/authRepository";
import { LoginDto, LoginResponse } from "../api/auth.dto";
import { ApiResponse } from "../../../services/api/commonDto";
import { DI_TOKENS } from "../../../di/tokens";

export const authMutationKeys = {
  all: ["auth"] as const,
  login: () => [...authMutationKeys.all, "login"] as const,
  signUp: () => [...authMutationKeys.all, "signUp"] as const,
  logout: () => [...authMutationKeys.all, "logout"] as const,
};

export type UseLoginOptions<TContext = unknown> = Omit<
  UseMutationOptions<ApiResponse<LoginResponse>, DefaultError, LoginDto, TContext>,
  "mutationFn"
>;

/**
 * Hook for user login with TSyringe Dependency Injection
 * @param repository Injected IAuthRepository (resolved via container.resolve by default)
 * @param options Optional TanStack Query mutation options
 */
export function useLogin<TContext = unknown>(
  repository: IAuthRepository = container.resolve<IAuthRepository>(
    DI_TOKENS.AuthRepository
  ),
  options?: UseLoginOptions<TContext>
) {
  const dispatch = useAppDispatch();

  return useMutation<ApiResponse<LoginResponse>, DefaultError, LoginDto, TContext>({
    ...options,
    mutationKey: authMutationKeys.login(),
    mutationFn: (data: LoginDto) => repository.login(data),
    onSuccess: (...args) => {
      const data = args[0];
      if (data?.data) {
        dispatch(
          sessionSet({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );
      }
      options?.onSuccess?.(...args);
    },
  });
}
