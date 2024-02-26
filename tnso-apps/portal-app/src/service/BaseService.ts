/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageHelper } from "../helpers/shared/MessageHelper";
import { API_URL_BASE } from "../config/environments";
import { del, get, patch, post, StatusCode } from "../helpers/api/RequestHelper";
import { AxiosResponse } from "axios";
import { Response } from "../interfaces/api/api";
import { ErrorHelper } from "../helpers/shared/ErrorHelper";

export class BaseService {
  static async get<T = any>(path?: string, params?: URLSearchParams): Promise<Response<T> | undefined> {
    try {
      const response = await get<T>(`${API_URL_BASE}/${path}`, { params });
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.badRequest);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.internalServerError);
      }
      return { data: undefined, status: StatusCode.NOT_FOUND };
    }
  }

  static async post<T = any>(path?: string, data?: T): Promise<Response<T> | undefined> {
    try {
      const response = await post<T>(`${API_URL_BASE}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  static async put<T = any>(path?: string, data?: T): Promise<Response<T> | undefined> {
    try {
      const response = await post<T>(`${API_URL_BASE}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  static async patch<T = any>(path?: string, data?: T): Promise<Response<T> | undefined> {
    try {
      const response = await patch<T>(`${API_URL_BASE}/${path}`, data);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }

  static async remove<T = any>(path?: string): Promise<Response<T> | undefined> {
    try {
      const response = await del<T>(`${API_URL_BASE}/${path}`);
      return { data: response?.data, status: response?.status };
    } catch (error) {
      const errorParsed = error as AxiosResponse;
      // error 400
      if (errorParsed?.status === StatusCode.BAD_REQUEST) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.badRequest);
      }
      // error 404
      if (errorParsed?.status === StatusCode.NOT_FOUND) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.notFound);
      }
      // error 500
      if (errorParsed?.status === StatusCode.INTERNAL_SERVER_ERROR) {
        MessageHelper.errorMessage(ErrorHelper.errorHTTP.internalServerError);
      }
    }
  }
}
