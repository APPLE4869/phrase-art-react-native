import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../models/ApplicationError";
import CurrentProfileDTO, { CurrentProfileResponse } from "../models/dto/CurrentProfileDTO";
import { apiPrivateClient, apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_CURRENT_PROFILE = "ADD_CURRENT_PROFILE:profile";

interface AddCurrentProfile {
  type: typeof ADD_CURRENT_PROFILE;
  payload: CurrentProfileDTO;
}

// Reducer用に利用するActionの型を定義
export type Action = AddCurrentProfile;

// ----- 以下、アクションメソッド定義 -----//

export function fetchProfile() {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<CurrentProfileResponse> = await apiPrivateClient.get('/current_profile');

    const currentProfile = new CurrentProfileDTO(response.data.currentProfile);

    dispatch({ type: ADD_CURRENT_PROFILE, payload: currentProfile });
  };
}

/**
 * URIを元に、送信するファイルデータを取得する
 */
function getFileDataFromUri(uri: string) {
  // URIの末尾にあるファイルの拡張子を取得
  const extension = uri.split(".").pop();

  return { uri, type: `image/${extension}`, name: "profile.jpg" };
}

/**
 * 送信するformDataを取得する
 */
function getFormData(uri: string) {
  const formData = new FormData();

  formData.append("image", getFileDataFromUri(uri));

  return formData;
}

// 会員登録処理
export function registerProfile(imageUri: string) {
  return async () => {
    try {
      const data = getFormData(imageUri);
      const response: AxiosResponse = await apiPrivateClient.patch("/current_profile/image", data, { timeout: 15000 });

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}
