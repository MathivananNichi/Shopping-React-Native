import { AxiosInstance } from "axios";
import { BaseRepository } from "../../../services/api/baseRepository";
import { AppEndPoints } from "../../../services/api/endpoints";
import { ApiResponse } from "../../../services/api/commonDto";
import { ProductsData, ProductQueryParams } from "../api/product.dto";

/**
 * Interface representing Product Data Access contract (OOP - Abstraction)
 */
export interface IProductRepository {
  getProducts(params?: ProductQueryParams): Promise<ApiResponse<ProductsData>>;
}

/**
 * ProductRepository (OOP - Inheritance, Encapsulation, Polymorphism)
 * Extends BaseRepository to fetch products from backend API.
 */
export class ProductRepository
  extends BaseRepository
  implements IProductRepository
{
  constructor(client: AxiosInstance) {
    super(client);
  }

  /**
   * Fetches product list with optional query parameters
   */
  async getProducts(
    params?: ProductQueryParams
  ): Promise<ApiResponse<ProductsData>> {
    return this.get<ApiResponse<ProductsData>>(AppEndPoints.fetchItems, {
      params,
    });
  }
}
