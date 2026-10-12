import "reflect-metadata";
import { container } from "tsyringe";
import { AxiosInstance } from "axios";
import { DI_TOKENS } from "./tokens";
import { ApiClient } from "../services/api/apiClient";
import {
  AuthRepository,
  IAuthRepository,
} from "../screens/auth/repository/authRepository";
import {
  ProductRepository,
  IProductRepository,
} from "../screens/home/repository/productRepository";

/**
 * TSyringe IoC Container Registrations
 */

// 1. Register Axios HTTP client instance
container.registerInstance<AxiosInstance>(DI_TOKENS.ApiClient, ApiClient);

// 2. Register AuthRepository
container.register<IAuthRepository>(DI_TOKENS.AuthRepository, {
  useFactory: (c) =>
    new AuthRepository(c.resolve<AxiosInstance>(DI_TOKENS.ApiClient)),
});

// 3. Register ProductRepository
container.register<IProductRepository>(DI_TOKENS.ProductRepository, {
  useFactory: (c) =>
    new ProductRepository(c.resolve<AxiosInstance>(DI_TOKENS.ApiClient)),
});

export { container, DI_TOKENS };
