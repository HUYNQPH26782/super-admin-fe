/** @format */

import axios from "axios";
import { AppConfig } from "../AppConfig";
import { getToken } from "./userToken";
import { message, notification } from "antd";
import { t } from "i18next";

export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (config.headers && token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data.status === 400) {
      console.error("Lỗi 400:", error.response.data);
      message.error("Lỗi rồi ạ")
      // notification.error({ message: t('common.badRequestException'), description: error.response.data });
    }
    return Promise.reject(error);
  }
);