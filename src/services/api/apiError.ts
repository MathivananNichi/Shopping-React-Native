// services/api/apiError.ts
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }

  // Normalizes any thrown value (AxiosError, network error, etc.) into an ApiError
  static from(error: unknown): ApiError {
    if (error instanceof ApiError) return error;

    if (isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message = error.response?.data?.message ?? error.message;
      return new ApiError(message, status);
    }

    return new ApiError('Network error', 0);
  }
}

function isAxiosError(error: unknown): error is { response?: any; message: string } {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}