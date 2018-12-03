import axios, { AxiosRequestConfig } from "axios";

const axiosPublicConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: __DEV__ ? "http://localhost:5000/api/public" : "https://phrase-art.herokuapp.com/api/public"
};

const axiosPrivateConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: __DEV__ ? "http://localhost:5000/api/private" : "https://phrase-art.herokuapp.com/api/private"
};

const apiPublicClient = axios.create(axiosPublicConfig);
const apiPrivateClient = axios.create(axiosPrivateConfig);

// JWTのトークン埋め込み用の処理
apiPrivateClient.interceptors.request.use(async request => {
  const jwt = window.store.getState().auth.jwt;
  request.headers.common.Authorization = `Bearer ${jwt}`;
  return request;
});

export { apiPublicClient, apiPrivateClient };
