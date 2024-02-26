import { AxiosResponse } from 'axios';
import { ApiCore } from './api-core';
import { StatusCode } from './models/api-core.model';
import { IResponse } from './models/response.model';
import { ErrorHelper } from './models/error.model';

export class ApiService {
  private static urlBase = '';

  /**
   * Set the base URL for the API.
   *
   * @param {string} url - the new base URL
   */
  public static setUrlBase(url: string) {
    this.urlBase = url;
  }

  /**
   * Makes a GET request to the specified path with optional parameters
   * @param path - the endpoint path
   * @param params - optional URL parameters
   * @returns a promise resolving to the response data and status, or undefined
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async get<T = any>(
    path?: string,
    params?: URLSearchParams
  ): Promise<IResponse<T> | undefined> {
    try {
      const response = await ApiCore.get<T>(`${this.urlBase}/${path}`, {
        params,
      });
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // handle error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        console.warn(ErrorHelper.errorHTTP.badRequest);
      }
      // handle error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        console.warn(ErrorHelper.errorHTTP.internalServerError);
      }
      return { data: undefined, status: StatusCode.NOT_FOUND };
    }
  }

  /**
   * Sends a POST request to the specified path with the provided data.
   * @param path - The endpoint to send the request to.
   * @param data - The data to be sent in the request body.
   * @returns A promise that resolves to the response data and status, or undefined if an error occurs.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async post<T = any>(
    path?: string,
    data?: T
  ): Promise<IResponse<T> | undefined> {
    try {
      const response = await ApiCore.post<T>(`${this.urlBase}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        console.warn(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        console.warn(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        console.warn(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  /**
   * Makes a PUT request to the specified path with the provided data
   * @param path - The path for the PUT request
   * @param data - The data to be sent with the PUT request
   * @returns A promise that resolves with the response data and status, or undefined if there's an error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async put<T = any>(
    path?: string,
    data?: T
  ): Promise<IResponse<T> | undefined> {
    try {
      const response = await ApiCore.post<T>(`${this.urlBase}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        console.warn(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        console.warn(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        console.warn(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  /**
   * Makes a PATCH request to the specified path with the provided data
   * @param path - The endpoint path
   * @param data - The data to be sent in the request body
   * @returns A promise that resolves to the response data and status, or undefined if an error occurs
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async patch<T = any>(
    path?: string,
    data?: T
  ): Promise<IResponse<T> | undefined> {
    try {
      const response = await ApiCore.patch<T>(`${this.urlBase}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        console.warn(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        console.warn(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        console.warn(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  /**
   * Remove data from the server.
   * @param path - The path for the resource to be removed.
   * @returns A promise that resolves with the response data and status, or undefined if an error occurs.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async remove<T = any>(
    path?: string
  ): Promise<IResponse<T> | undefined> {
    try {
      const response = await ApiCore.delete<T>(`${this.urlBase}/${path}`);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        console.warn(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        console.warn(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        console.warn(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }
}
