import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { Dispatch } from "redux";
import ApplicationError from "../models/ApplicationError";
import CurrentUserDTO, { CurrentUserResponse } from "../models/dto/currentUserDTO";
import { apiPrivateClient, apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_JWT = "ADD_JWT:auth";
export const ADD_CURRENT_USER = "ADD_CURRENT_USER:auth";
export const UPDATE_USERNAME = "UPDATE_USERNAME:auth";
export const CLEAR_AUTH = "CLEAR_AUTH:auth";

interface AddJwt {
  type: typeof ADD_JWT;
  payload: string;
}

interface AddCurrentUser {
  type: typeof ADD_CURRENT_USER;
  payload: CurrentUserDTO;
}

interface updateUsername {
  type: typeof UPDATE_USERNAME;
  payload: string;
}

interface RemoveJwt {
  type: typeof CLEAR_AUTH;
}

// Reducer用に利用するActionの型を定義
export type Action = AddJwt | AddCurrentUser | updateUsername | RemoveJwt;

// ----- 以下、アクションメソッド定義 -----//

const loginRequest = async (username: string, password: string): Promise<string> => {
  const response: AxiosResponse = await apiPublicClient.post("/login", {
    username,
    password
  });

  if (response.status !== 200) {
    throw new Error("メールアドレスまたはパスワードが間違っています");
  }

  const jwt: string = response.headers.authorization.replace("Bearer ", "");

  return jwt;
};

const fetchCurrentUser = async (): Promise<CurrentUserDTO> => {
  const response: AxiosResponse<CurrentUserResponse> = await apiPrivateClient.get("/currentUser");

  if (response.status !== 200) {
    throw new Error("予期しないエラーが発生しました。時間をあけて再度実行してみてください。");
  }

  const currentUser = new CurrentUserDTO(response.data.currentUser);

  return currentUser;
};

// 会員登録処理
export function register(username: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse = await apiPublicClient.post("/signup", {
        username,
        password
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      const jwt: string = await loginRequest(username, password);

      await dispatch({ type: ADD_JWT, payload: jwt });

      const currentUser: CurrentUserDTO = await fetchCurrentUser();

      dispatch({ type: ADD_CURRENT_USER, payload: currentUser });
    } catch (e) {
      new ApplicationError(e).alertMessage();
      dispatch({ type: CLEAR_AUTH });

      throw e;
    }
  };
}

// ログイン処理
export function login(username: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const jwt: string = await loginRequest(username, password);

      await dispatch({ type: ADD_JWT, payload: jwt });

      const currentUser: CurrentUserDTO = await fetchCurrentUser();

      dispatch({ type: ADD_CURRENT_USER, payload: currentUser });
    } catch (e) {
      Alert.alert("メールアドレスまたはパスワードが間違っています");
      dispatch({ type: CLEAR_AUTH });

      throw e;
    }
  };
}

export function logout(): RemoveJwt {
  return { type: CLEAR_AUTH };
}

// 会員登録処理
export function updateUsername(username: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse = await apiPrivateClient.patch("/current_user/username", { username });

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }

      dispatch({ type: UPDATE_USERNAME, payload: username });
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}

// 会員登録処理
export function updatePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.patch("/current_user/password", {
        currentPassword,
        newPassword,
        confirmNewPassword
      });

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}
