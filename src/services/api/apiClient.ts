import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AppEndPoints } from "./endpoints";
import { ApiError } from "./apiError";
import { logger } from "react-native-logs";

var log = logger.createLogger();
export const apiClient = axios.create({
  baseURL: AppEndPoints.baseUrl,
  timeout: 15_000,
  
  headers: { "Content-Type": "application/json" },
});

import { store } from "../../store/store";

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.request.use((req) => {
  const body = req.data ? (typeof req.data === "string" ? req.data : JSON.stringify(req.data, null, 2)) : "None";
  log.info(`Request ${req.method?.toUpperCase()} ${req.url}\nBody: ${body}`);

  return req;
});

apiClient.interceptors.response.use(
  (res) => {
    const data = res.data ? (typeof res.data === "string" ? res.data : JSON.stringify(res.data, null, 2)) : "None";
    log.info(
      `Response [${res.status}] ${res.config.method?.toUpperCase()} ${res.config.url}\nData: ${data}`,
    );
    return res;
  },
  async (error) => {
    const errorData = error.response?.data
      ? (typeof error.response.data === "string" ? error.response.data : JSON.stringify(error.response.data, null, 2))
      : error.message;
    log.error(
      `Error ${error.config?.method?.toUpperCase()} ${error.config?.url}\nDetails: ${errorData}`,
    );
    return Promise.reject(ApiError.from(error));
  },
);

export const ApiClient = apiClient;
