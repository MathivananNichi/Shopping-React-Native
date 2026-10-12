import { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * BaseRepository (OOP Concept - Abstraction & Inheritance)
 * Provides common HTTP capabilities to all concrete repositories.
 *
 * The AxiosInstance is injected via the constructor — no default fallback —
 * so that concrete repositories receive it from the DI container (production)
 * or from a test mock (unit tests).
 */
export abstract class BaseRepository {
  protected readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  protected async post<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  protected async patch<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
