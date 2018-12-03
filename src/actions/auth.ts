import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { Dispatch } from "redux";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_JWT = "ADD_JWT:auth";
export const REMOVE_JWT = "REMOVE_JWT:auth";

interface AddJwt {
  type: typeof ADD_JWT;
  payload: string;
}

interface RemoveJwt {
  type: typeof REMOVE_JWT;
}

// Reducer用に利用するActionの型を定義
export type Action = AddJwt | RemoveJwt;

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

// 会員登録処理
export function register(username: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse = await apiPublicClient.post("/signup", {
        username,
        password
      });

      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

      const jwt: string = await loginRequest(username, password);

      dispatch({ type: ADD_JWT, payload: jwt });
    } catch (e) {
      Alert.alert(e.message);

      throw e;
    }
  };
}

// ログイン処理
export function login(username: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const jwt: string = await loginRequest(username, password);

      dispatch({ type: ADD_JWT, payload: jwt });
    } catch (e) {
      Alert.alert("メールアドレスまたはパスワードが間違っています");

      throw e;
    }
  };
}

export function logout(): RemoveJwt {
  return { type: REMOVE_JWT };
}
