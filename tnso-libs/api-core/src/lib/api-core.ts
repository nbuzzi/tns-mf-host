import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiInstance } from './config/axios-instance';

export class ApiCore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.get<T>(url, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async post<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.post<T>(url, data, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async put<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.put<T>(url, data, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async patch<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.patch<T>(url, data, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.delete<T>(url, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async auth<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instance.post<T>(url, data, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async refresh<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> {
    const response = await ApiInstance.instanceAuth.post<T>(url, data, config);
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static encodeParams<T = any>(params: T) {
    const encodedParams = new URLSearchParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        encodedParams.append(key, params[key as keyof T] as string);
      });
    }

    return encodedParams;
  }
}
