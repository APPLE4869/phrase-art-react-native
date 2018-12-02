import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: __DEV__ ? "http://localhost:5000/api/public/" : "https://phrase-art.herokuapp.com/api/public/"
};

const apiClient = axios.create(axiosConfig);

// JWTのトークン埋め込み用の処理
// apiClient.interceptors.request.use(async request => {
//   const token = window.store.getState().session.token;
//   request.headers.common.Authorization = `Bearer ${token}`;
//   return request;
// });

export default apiClient;
