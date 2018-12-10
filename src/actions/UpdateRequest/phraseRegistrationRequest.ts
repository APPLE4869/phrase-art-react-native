import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import PhraseDecisionDTO, { ResultType } from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseRegistrationRequestDTO, {
  PhraseRegistrationRequestResponse
} from "../../models/dto/UpdateRequest/PhraseRegistrationRequestDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_PHRASE_REGISTRATION_REQUEST = "ADD_PHRASE_REGISTRATION_REQUEST:phraseRegistrationRequest";
export const ADD_PHRASE_DECISION = "ADD_PHRASE_DECISION:phraseRegistrationRequest";
export const CHANGE_DECISION_RESULT = "CHANGE_DECISION_RESULT:phraseRegistrationRequest";

interface AddPhraseRegistrationRequest {
  type: typeof ADD_PHRASE_REGISTRATION_REQUEST;
  payload: PhraseRegistrationRequestDTO;
}

interface AddPhraseDecision {
  type: typeof ADD_PHRASE_DECISION;
  payload?: PhraseDecisionDTO;
}

interface ChangeDecisionResult {
  type: typeof CHANGE_DECISION_RESULT;
  payload: ResultType;
}

// Reducer用に利用するActionの型を定義
export type Action = AddPhraseRegistrationRequest | AddPhraseDecision | ChangeDecisionResult;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function submitRegisterRequest(
  categoryId: string,
  subcategoryName: string,
  phraseContent: string,
  authorName: string
) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(
        "/update_request/submit_phrase_registration_request",
        {
          categoryId,
          subcategoryName,
          phraseContent,
          authorName
        }
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
    const response: AxiosResponse<PhraseRegistrationRequestResponse> = await apiPublicClient.get(
      `/update_request/${id}/phrase_registration_request`
    );

    const { phraseRegistrationRequest, phraseDecision } = response.data;
    const phraseRegistrationRequestPayload = new PhraseRegistrationRequestDTO(phraseRegistrationRequest);
    const phraseDecisionPayload = phraseDecision ? new PhraseDecisionDTO(phraseDecision) : undefined;

    dispatch({ type: ADD_PHRASE_REGISTRATION_REQUEST, payload: phraseRegistrationRequestPayload });
    dispatch({ type: ADD_PHRASE_DECISION, payload: phraseDecisionPayload });
  };
}

export function changeDecisionResult(result: ResultType) {
  return { type: CHANGE_DECISION_RESULT, payload: result };
}
