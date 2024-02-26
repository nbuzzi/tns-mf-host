/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Key } from "react";
import { ConnectivityStatus } from "../../interfaces/devices/devices";
import { AxiosHelper } from "../../config/api/AxiosInstance";
import { SortOrder } from "antd/es/table/interface";

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

export enum ErrorMessage {
  BAD_ACCESS_TOKEN = "BAD_ACCESS_TOKEN",
  BAD_REFRESH_TOKEN = "BAD_REFRESH_TOKEN",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  ACCOUNT_DISABLED = "ACCOUNT_DISABLED",
  ACCOUNT_EXPIRED = "ACCOUNT_EXPIRED",
  RECENT_PASSWORDS_MATCH = "RECENT_PASSWORDS_MATCH",
  PASSWORD_MIN_LENGTH_DOES_NOT_MATCH = "PASSWORD_MIN_LENGTH_DOES_NOT_MATCH",
  PASSWORD_COMPLEXITY_DOES_NOT_MATCH = "PASSWORD_COMPLEXITY_DOES_NOT_MATCH",
  PASSWORD_CONTAINS_USERNAME = "PASSWORD_CONTAINS_USERNAME",
  BAD_RESET_PASSWORD_TOKEN = "BAD_RESET_PASSWORD_TOKEN"
}

export interface BuilderParams {
  currentPage?: number;
  recordsPerPage?: number;
  selectedStatuses?: ConnectivityStatus[];
  acnasKeys?: Key[];
  tableFilters?: Record<string, string>;
  isSameGroups?: boolean;
  orderBy?: string | SortOrder;
  sortBy?: string | Key;
}

export interface ApiResponse extends AxiosResponse {
  error: Error;
}

export const get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    const response = await AxiosHelper.instance.get<T>(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    const response = await AxiosHelper.instance.post<T>(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const put = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return AxiosHelper.instance.put<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const patch = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return AxiosHelper.instance.patch<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const del = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return AxiosHelper.instance.delete<T>(url, config);
  } catch (error) {
    throw error;
  }
};

export const auth = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return axios.post<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const refresh = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return AxiosHelper.instanceAuth.post<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const sendPatch = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return await axios.patch<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const sendPost = async <T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
  try {
    return await axios.post<T>(url, data, config);
  } catch (error) {
    throw error;
  }
};

export const encodeParams = <T = any>(params: T): URLSearchParams => {
  const encodedParams = new URLSearchParams();

  if (params) {
    Object.keys(params).forEach((key) => {
      encodedParams.append(key, params[key as keyof T] as string);
    });
  }

  return encodedParams;
};
