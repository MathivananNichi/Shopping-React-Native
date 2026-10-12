import {
  useMutation,
  UseMutationOptions,
  DefaultError,
} from "@tanstack/react-query";
import { container } from "tsyringe";
import { SignUpDto, SignUpResponse } from "../api/auth.dto";
import { ApiResponse } from "../../../services/api/commonDto";
import { IAuthRepository } from "../repository/authRepository";
import { authMutationKeys } from "./useLogin";
import { DI_TOKENS } from "../../../di/tokens";

export type UseSignUpOptions<TContext = unknown> = Omit<
  UseMutationOptions<ApiResponse<SignUpResponse>, DefaultError, SignUpDto, TContext>,
  "mutationFn"
>;

/**
 * Hook for user registration with TSyringe Dependency Injection
 * @param repository Injected IAuthRepository (resolved via container.resolve by default)
 * @param options Optional TanStack Query mutation options
 */
export function useSignUp<TContext = unknown>(
  repository: IAuthRepository = container.resolve<IAuthRepository>(
    DI_TOKENS.AuthRepository
  ),
  options?: UseSignUpOptions<TContext>
) {
  return useMutation<ApiResponse<SignUpResponse>, DefaultError, SignUpDto, TContext>({
    ...options,
    mutationKey: authMutationKeys.signUp(),
    mutationFn: (data: SignUpDto) => repository.signUp(data),
  });
}
