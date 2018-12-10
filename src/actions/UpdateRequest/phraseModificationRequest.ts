import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import PhraseDecisionDTO, { ResultType } from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseModificationRequestDTO, {
  PhraseModificationRequestResponse
} from "../../models/dto/UpdateRequest/PhraseModificationRequestDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_PHRASE_MODIFICATION_REQUEST = "ADD_PHRASE_MODIFICATION_REQUEST:phraseModificationRequest";
export const ADD_PHRASE_DECISION = "ADD_PHRASE_DECISION:phraseModificationRequest";
export const CHANGE_DECISION_RESULT = "CHANGE_DECISION_RESULT:phraseModificationRequest";

interface AddPhraseModificationRequest {
  type: typeof ADD_PHRASE_MODIFICATION_REQUEST;
  payload: PhraseModificationRequestDTO;
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
export type Action = AddPhraseModificationRequest | AddPhraseDecision | ChangeDecisionResult;

// ----- 以下、アクションメソッド定義 -----//

export function submitPhraseModificationRequest(
  phraseId: string,
  categoryId: string,
  subcategoryName: string,
  phraseContent: string,
  authorName: string
) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(
        "/update_request/submit_phrase_modification_request",
        {
          phraseId,
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
    const response: AxiosResponse<PhraseModificationRequestResponse> = await apiPublicClient.get(
      `/update_request/${id}/phrase_modification_request`
    );

    const { phraseModificationRequest, phraseDecision } = response.data;
    const phraseModificationRequestPayload = new PhraseModificationRequestDTO(phraseModificationRequest);
    const phraseDecisionPayload = phraseDecision ? new PhraseDecisionDTO(phraseDecision) : undefined;

    dispatch({ type: ADD_PHRASE_MODIFICATION_REQUEST, payload: phraseModificationRequestPayload });
    dispatch({ type: ADD_PHRASE_DECISION, payload: phraseDecisionPayload });
  };
}

export function changeDecisionResult(result: ResultType) {
  return { type: CHANGE_DECISION_RESULT, payload: result };
}
