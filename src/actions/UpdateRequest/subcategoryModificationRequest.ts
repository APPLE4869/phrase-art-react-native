import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import SubcategoryModificationRequestDTO, {
  SubcategoryModificationRequestResponse
} from "../../models/dto/UpdateRequest/SubcategoryModificationRequestDTO";
import UpdateRequestDecisionDTO, { ResultType } from "../../models/dto/UpdateRequest/UpdateRequestDecisionDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_SUBCATEGORY_MODIFICATION_REQUEST =
  "ADD_SUBCATEGORY_MODIFICATION_REQUEST:subcategoryModificationRequest";
export const ADD_UPDATE_REQUEST_DECISION = "ADD_UPDATE_REQUEST_DECISION:subcategoryModificationRequest";
export const CHANGE_DECISION_RESULT = "CHANGE_DECISION_RESULT:subcategoryModificationRequest";
export const INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST =
  "INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST:subcategoryModificationRequest";
export const INITIALIZE_DECISION = "INITIALIZE_DECISION:subcategoryModificationRequest";

interface AddSubcategoryModificationRequest {
  type: typeof ADD_SUBCATEGORY_MODIFICATION_REQUEST;
  payload: SubcategoryModificationRequestDTO;
}

interface AddUpdateRequestDecision {
  type: typeof ADD_UPDATE_REQUEST_DECISION;
  payload?: UpdateRequestDecisionDTO;
}

interface ChangeDecisionResult {
  type: typeof CHANGE_DECISION_RESULT;
  payload: ResultType;
}

interface InitializeSubcategoryModificationRequest {
  type: typeof INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST;
}

interface InitializeDecision {
  type: typeof INITIALIZE_DECISION;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddSubcategoryModificationRequest
  | AddUpdateRequestDecision
  | ChangeDecisionResult
  | InitializeSubcategoryModificationRequest
  | InitializeDecision;

// ----- 以下、アクションメソッド定義 -----//

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
function getRequestFormData(
  subcategoryId: string,
  subcategoryName: string,
  imageUri: string,
  introduction: string,
  videoOnDemandNameKeys: string[]
) {
  const formData = new FormData();

  formData.append("id", subcategoryId);
  if (imageUri) {
    formData.append("image", getFileDataFromUri(imageUri));
  }
  formData.append("name", subcategoryName);
  formData.append("introduction", introduction);

  videoOnDemandNameKeys.forEach(key => {
    formData.append("videoOnDemandNameKeys", key);
  });

  return formData;
}

export function submitSubcategoryModificationRequest(
  subcategoryId: string,
  subcategoryName: string,
  imageUri: string,
  introduction: string,
  videoOnDemandNameKeys: string[]
) {
  return async () => {
    try {
      const data = getRequestFormData(subcategoryId, subcategoryName, imageUri, introduction, videoOnDemandNameKeys);
      const response: AxiosResponse = await apiPrivateClient.post(
        "/update_request/submit_subcategory_modification_request",
        data,
        { timeout: 15000 }
      );

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}

export function fetchById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<SubcategoryModificationRequestResponse> = await apiPublicClient.get(
      `/update_request/${id}/subcategory_modification_request`
    );

    const { subcategoryModificationRequest, updateRequestDecision } = response.data;
    const subcategoryModificationRequestPayload = new SubcategoryModificationRequestDTO(subcategoryModificationRequest);
    const updateRequestDecisionPayload = updateRequestDecision
      ? new UpdateRequestDecisionDTO(updateRequestDecision)
      : undefined;

    dispatch({ type: ADD_SUBCATEGORY_MODIFICATION_REQUEST, payload: subcategoryModificationRequestPayload });
    dispatch({ type: ADD_UPDATE_REQUEST_DECISION, payload: updateRequestDecisionPayload });
  };
}

export function changeDecisionResult(result: ResultType) {
  return { type: CHANGE_DECISION_RESULT, payload: result };
}

export function initializeSubcategoryModificationRequest(): InitializeSubcategoryModificationRequest {
  return { type: INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST };
}

export function initializeDecision(): InitializeDecision {
  return { type: INITIALIZE_DECISION };
}
