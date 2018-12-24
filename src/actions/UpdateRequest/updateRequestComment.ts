import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import UpdateRequestCommentDTO, {
  UpdateRequestCommentsResponse
} from "../../models/dto/UpdateRequest/UpdateRequestCommentDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

export const ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS = "ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS:updateRequestComment";
export const ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS = "ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS:updateRequestComment";
export const INITIALIZE_UPDATE_REQUEST_COMMENTS = "INITIALIZE_UPDATE_REQUEST_COMMENTS:updateRequestComment";

interface AddPreviousUpdateRequestComments {
  type: typeof ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS;
  payload: UpdateRequestCommentDTO[];
}

interface AddFollowingUpdateRequestComments {
  type: typeof ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS;
  payload: UpdateRequestCommentDTO[];
}

interface InitializeUpdateRequestComments {
  type: typeof INITIALIZE_UPDATE_REQUEST_COMMENTS;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddPreviousUpdateRequestComments
  | AddFollowingUpdateRequestComments
  | InitializeUpdateRequestComments;

// ----- 以下、アクションメソッド定義 -----//

export function submitComment(updateRequestId: string, content: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(`/update_requests/comment`, {
        updateRequestId,
        content
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

// latestCommentIdより前のものを名言を取得
export function fetchPreviousUpdateRequestComments(
  updateRequestId: string,
  firstFetchedCommentId: string = "",
  offset: number = 0
) {
  return async (dispatch: Dispatch<Action>) => {
    const latestCommentIdParam = firstFetchedCommentId ? `&latest_comment_id=${firstFetchedCommentId}` : "";
    const response: AxiosResponse<UpdateRequestCommentsResponse> = await apiPublicClient.get(
      `/update_requests/${updateRequestId}/comments/previous?offset=${offset}${latestCommentIdParam}`
    );

    const comments: UpdateRequestCommentDTO[] = response.data.comments.map(
      comment => new UpdateRequestCommentDTO(comment)
    );

    dispatch({ type: ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS, payload: comments });
  };
}

// latestCommentIdより後の名言を取得
export function fetchFollowingUpdateRequestComments(updateRequestId: string, latestCommentId: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<UpdateRequestCommentsResponse> = await apiPublicClient.get(
      `/update_requests/${updateRequestId}/comments/following?latest_comment_id=${latestCommentId}`
    );

    const comments: UpdateRequestCommentDTO[] = response.data.comments.map(
      comment => new UpdateRequestCommentDTO(comment)
    );

    dispatch({ type: ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS, payload: comments });
  };
}

export function initializeUpdateRequestComments(): InitializeUpdateRequestComments {
  return { type: INITIALIZE_UPDATE_REQUEST_COMMENTS };
}
