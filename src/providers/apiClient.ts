import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";

const devBaseUrl = Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000";

const axiosPublicConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: __DEV__ ? `${devBaseUrl}/api/public` : "https://phrase-art.herokuapp.com/api/public"
};

const axiosPrivateConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: __DEV__ ? `${devBaseUrl}/api/private` : "https://phrase-art.herokuapp.com/api/private"
};

const apiPublicClient = axios.create(axiosPublicConfig);
const apiPrivateClient = axios.create(axiosPrivateConfig);

// JWTのトークン埋め込み用の処理
apiPublicClient.interceptors.request.use(async request => {
  const jwt = window.store.getState().auth.jwt;
  if (jwt) {
    request.headers.common.Authorization = `Bearer ${jwt}`;
  }
  return request;
});

// JWTのトークン埋め込み用の処理
apiPrivateClient.interceptors.request.use(async request => {
  const jwt = window.store.getState().auth.jwt;
  if (jwt) {
    request.headers.common.Authorization = `Bearer ${jwt}`;
  }
  return request;
});

export { apiPublicClient, apiPrivateClient };
