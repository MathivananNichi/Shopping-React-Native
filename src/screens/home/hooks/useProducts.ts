import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { container } from "tsyringe";
import { IProductRepository } from "../repository/productRepository";
import { ProductsData, ProductQueryParams } from "../api/product.dto";
import { ApiResponse } from "../../../services/api/commonDto";
import { DI_TOKENS } from "../../../di/tokens";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (params?: ProductQueryParams) =>
    [...productQueryKeys.all, "list", params] as const,
};

export type UseProductsOptions = Omit<
  UseQueryOptions<ApiResponse<ProductsData>, Error, ApiResponse<ProductsData>>,
  "queryKey" | "queryFn"
>;

/**
 * Hook to fetch products using TanStack React Query & TSyringe DI
 */
export function useProducts(
  params?: ProductQueryParams,
  repository: IProductRepository = container.resolve<IProductRepository>(
    DI_TOKENS.ProductRepository,
  ),
  options?: UseProductsOptions,
) {
  return useQuery<ApiResponse<ProductsData>, Error>({
    queryKey: productQueryKeys.list(params),
    queryFn: async () => {
      return repository.getProducts(params);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
    gcTime: 1000 * 60 * 15, // 15 minutes garbage collection
    ...options,
  });
}
