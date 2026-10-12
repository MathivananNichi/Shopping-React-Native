/**
 * Dependency Injection Tokens for TSyringe
 */
export const DI_TOKENS = {
  AuthRepository: Symbol("IAuthRepository"),
  ProductRepository: Symbol("IProductRepository"),
  ApiClient: Symbol("ApiClient"),
} as const;
