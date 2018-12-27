import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../models/ApplicationError";
import FreeChatCommentDTO, { FreeChatCommentsResponse } from "../models/dto/FreeChatCommentDTO";
import { apiPrivateClient, apiPublicClient } from "../providers/apiClient";

export const ADD_PREVIOUS_FREE_CHAT_COMMENTS = "ADD_PREVIOUS_FREE_CHAT_COMMENTS:freeChatComment";
export const ADD_FOLLOWING_FREE_CHAT_COMMENTS = "ADD_FOLLOWING_FREE_CHAT_COMMENTS:freeChatComment";
export const INITIALIZE_FREE_CHAT_COMMENTS = "INITIALIZE_FREE_CHAT_COMMENTS:freeChatComment";

interface AddPreviousFreeChatComments {
  type: typeof ADD_PREVIOUS_FREE_CHAT_COMMENTS;
  payload: FreeChatCommentDTO[];
}

interface AddFollowingFreeChatComments {
  type: typeof ADD_FOLLOWING_FREE_CHAT_COMMENTS;
  payload: FreeChatCommentDTO[];
}

interface InitializeFreeChatComments {
  type: typeof INITIALIZE_FREE_CHAT_COMMENTS;
}

// Reducer用に利用するActionの型を定義
export type Action = AddPreviousFreeChatComments | AddFollowingFreeChatComments | InitializeFreeChatComments;

// ----- 以下、アクションメソッド定義 -----//

export function submitComment(content: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(`/free_chat_comment`, { content });

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
export function fetchPreviousFreeChatComments(firstFetchedCommentId: string = "", offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const latestCommentIdParam = firstFetchedCommentId ? `&latest_comment_id=${firstFetchedCommentId}` : "";
    const response: AxiosResponse<FreeChatCommentsResponse> = await apiPublicClient.get(
      `/free_chat_comment/previous?offset=${offset}${latestCommentIdParam}`
    );

    const comments: FreeChatCommentDTO[] = response.data.comments.map(comment => new FreeChatCommentDTO(comment));

    dispatch({ type: ADD_PREVIOUS_FREE_CHAT_COMMENTS, payload: comments });
  };
}

// latestCommentIdより後の名言を取得
export function fetchFollowingFreeChatComments(latestCommentId: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<FreeChatCommentsResponse> = await apiPublicClient.get(
      `/free_chat_comment/following?latest_comment_id=${latestCommentId}`
    );

    const comments: FreeChatCommentDTO[] = response.data.comments.map(comment => new FreeChatCommentDTO(comment));

    dispatch({ type: ADD_FOLLOWING_FREE_CHAT_COMMENTS, payload: comments });
  };
}

export function initializeFreeChatComments(): InitializeFreeChatComments {
  return { type: INITIALIZE_FREE_CHAT_COMMENTS };
}
