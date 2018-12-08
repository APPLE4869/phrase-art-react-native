import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import UpdateRequestDTO, { UpdateRequestsResponse } from "../../models/dto/UpdateRequest/UpdateRequestDTO";
import { apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_REQUESTING_UPDATE_REQUESTS = "ADD_REQUESTING_UPDATE_REQUESTS:updateRequests";
export const ADD_FINISHED_UPDATE_REQUESTS = "ADD_FINISHED_UPDATE_REQUESTS:updateRequests";
export const INITIALIZE_REQUESTING_UPDATE_REQUESTS = "INITIALIZE_REQUESTING_UPDATE_REQUESTS:updateRequests";
export const INITIALIZE_FINISHED_UPDATE_REQUESTS = "INITIALIZE_FINISHED_UPDATE_REQUESTS:updateRequests";

interface AddRequestingUpdateRequests {
  type: typeof ADD_REQUESTING_UPDATE_REQUESTS;
  payload: UpdateRequestDTO[];
}

interface AddFinishedUpdateRequests {
  type: typeof ADD_FINISHED_UPDATE_REQUESTS;
  payload: UpdateRequestDTO[];
}

interface InitializeRequestingUpdateRequests {
  type: typeof INITIALIZE_REQUESTING_UPDATE_REQUESTS;
}

interface InitializeFinishedUpdateRequests {
  type: typeof INITIALIZE_FINISHED_UPDATE_REQUESTS;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddRequestingUpdateRequests
  | AddFinishedUpdateRequests
  | InitializeRequestingUpdateRequests
  | InitializeFinishedUpdateRequests;

// ----- 以下、アクションメソッド定義 -----//

// 申請中の更新申請を取得
export function fetchRequestingUpdateRequests(offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<UpdateRequestsResponse> = await apiPublicClient.get(
      `/update_requests/requesting?offset=${offset}`
    );

    const updateRequests: UpdateRequestDTO[] = response.data.updateRequests.map(
      updateRequest => new UpdateRequestDTO(updateRequest)
    );

    dispatch({ type: ADD_REQUESTING_UPDATE_REQUESTS, payload: updateRequests });
  };
}

// 完了済みの更新申請を取得
export function fetchFinishedUpdateRequests(offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<UpdateRequestsResponse> = await apiPublicClient.get(
      `/update_requests/finished?offset=${offset}`
    );

    const updateRequests: UpdateRequestDTO[] = response.data.updateRequests.map(
      updateRequest => new UpdateRequestDTO(updateRequest)
    );

    dispatch({ type: ADD_FINISHED_UPDATE_REQUESTS, payload: updateRequests });
  };
}

// 取得した申請中の更新申請を初期化
export function initializeRequestingUpdateRequests(): InitializeRequestingUpdateRequests {
  return { type: INITIALIZE_REQUESTING_UPDATE_REQUESTS };
}

// 取得した完了済みの更新申請を初期化
export function initializeFinishedUpdateRequests(): InitializeFinishedUpdateRequests {
  return { type: INITIALIZE_FINISHED_UPDATE_REQUESTS };
}
