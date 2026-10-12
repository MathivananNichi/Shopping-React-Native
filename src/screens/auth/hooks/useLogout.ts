import {
  useMutation,
  UseMutationOptions,
  DefaultError,
} from "@tanstack/react-query";
import { container } from "tsyringe";
import { useAppDispatch } from "../../../store/hooks";
import { sessionCleared } from "../store/authSlice";
import { IAuthRepository } from "../repository/authRepository";
import { ApiResponse } from "../../../services/api/commonDto";
import { authMutationKeys } from "./useLogin";
import { DI_TOKENS } from "../../../di/tokens";

export type UseLogoutOptions<TContext = unknown> = Omit<
  UseMutationOptions<ApiResponse<null>, DefaultError, void, TContext>,
  "mutationFn"
>;

/**
 * Hook for user logout with TSyringe Dependency Injection
 * @param repository Injected IAuthRepository (resolved via container.resolve by default)
 * @param options Optional TanStack Query mutation options
 */
export function useLogout<TContext = unknown>(
  repository: IAuthRepository = container.resolve<IAuthRepository>(
    DI_TOKENS.AuthRepository
  ),
  options?: UseLogoutOptions<TContext>
) {
  const dispatch = useAppDispatch();

  return useMutation<ApiResponse<null>, DefaultError, void, TContext>({
    ...options,
    mutationKey: authMutationKeys.logout(),
    mutationFn: () => repository.logout(),
    onSettled: (...args) => {
      dispatch(sessionCleared());
      options?.onSettled?.(...args);
    },
  });
}
