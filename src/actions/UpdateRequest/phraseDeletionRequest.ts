import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import PhraseDecisionDTO, { ResultType } from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseDeletionRequestDTO, {
  PhraseDeletionRequestResponse
} from "../../models/dto/UpdateRequest/PhraseDeletionRequestDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_PHRASE_DELETION_REQUEST = "ADD_PHRASE_DELETION_REQUEST:phraseDeletionRequest";
export const ADD_PHRASE_DECISION = "ADD_PHRASE_DECISION:phraseDeletionRequest";
export const CHANGE_DECISION_RESULT = "CHANGE_DECISION_RESULT:phraseDeletionRequest";
export const INITIALIZE_PHRASE_DELETION_REQUEST = "INITIALIZE_PHRASE_DELETION_REQUEST:phraseDeletionRequest";
export const INITIALIZE_DECISION = "INITIALIZE_DECISION:phraseDeletionRequest";

interface AddPhraseDeletionRequest {
  type: typeof ADD_PHRASE_DELETION_REQUEST;
  payload: PhraseDeletionRequestDTO;
}

interface AddPhraseDecision {
  type: typeof ADD_PHRASE_DECISION;
  payload?: PhraseDecisionDTO;
}

interface ChangeDecisionResult {
  type: typeof CHANGE_DECISION_RESULT;
  payload: ResultType;
}

interface InitializePhraseDeletionRequest {
  type: typeof INITIALIZE_PHRASE_DELETION_REQUEST;
}

interface InitializeDecision {
  type: typeof INITIALIZE_DECISION;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddPhraseDeletionRequest
  | AddPhraseDecision
  | ChangeDecisionResult
  | InitializePhraseDeletionRequest
  | InitializeDecision;

// ----- 以下、アクションメソッド定義 -----//

export function submitPhraseDeletionRequest(phraseId: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post("/update_request/submit_phrase_deletion_request", {
        phraseId
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

export function fetchById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhraseDeletionRequestResponse> = await apiPublicClient.get(
      `/update_request/${id}/phrase_deletion_request`
    );

    const { phraseDeletionRequest, phraseDecision } = response.data;
    const phraseDeletionRequestPayload = new PhraseDeletionRequestDTO(phraseDeletionRequest);
    const phraseDecisionPayload = phraseDecision ? new PhraseDecisionDTO(phraseDecision) : undefined;

    dispatch({ type: ADD_PHRASE_DELETION_REQUEST, payload: phraseDeletionRequestPayload });
    dispatch({ type: ADD_PHRASE_DECISION, payload: phraseDecisionPayload });
  };
}

export function changeDecisionResult(result: ResultType) {
  return { type: CHANGE_DECISION_RESULT, payload: result };
}

export function initializePhraseDeletionRequest(): InitializePhraseDeletionRequest {
  return { type: INITIALIZE_PHRASE_DELETION_REQUEST };
}

export function initializeDecision(): InitializeDecision {
  return { type: INITIALIZE_DECISION };
}
