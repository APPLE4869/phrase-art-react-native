import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import ApplicationError from "../../models/ApplicationError";
import PhraseCommentDTO, { PhraseCommentsResponse } from "../../models/dto/Phrase/PhraseCommentDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

export const ADD_PREVIOUS_PHRASE_COMMENTS = "ADD_PREVIOUS_PHRASE_COMMENTS:phraseComment";
export const ADD_FOLLOWING_PHRASE_COMMENTS = "ADD_FOLLOWING_PHRASE_COMMENTS:phraseComment";
export const INITIALIZE_PHRASE_COMMENTS = "INITIALIZE_PHRASE_COMMENTS:phraseComment";

interface AddPreviousPhraseComments {
  type: typeof ADD_PREVIOUS_PHRASE_COMMENTS;
  payload: PhraseCommentDTO[];
}

interface AddFollowingPhraseComments {
  type: typeof ADD_FOLLOWING_PHRASE_COMMENTS;
  payload: PhraseCommentDTO[];
}

interface InitializePhraseComments {
  type: typeof INITIALIZE_PHRASE_COMMENTS;
}

// Reducer用に利用するActionの型を定義
export type Action = AddPreviousPhraseComments | AddFollowingPhraseComments | InitializePhraseComments;

// ----- 以下、アクションメソッド定義 -----//

export function submitComment(phraseId: string, content: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(`/phrases/comment`, {
        phraseId,
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
export function fetchPreviousPhraseComments(phraseId: string, firstFetchedCommentId: string = "", offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const latestCommentIdParam = firstFetchedCommentId ? `&latest_comment_id=${firstFetchedCommentId}` : "";
    const response: AxiosResponse<PhraseCommentsResponse> = await apiPublicClient.get(
      `/phrases/${phraseId}/comments/previous?offset=${offset}${latestCommentIdParam}`
    );

    const comments: PhraseCommentDTO[] = response.data.comments.map(comment => new PhraseCommentDTO(comment));

    dispatch({ type: ADD_PREVIOUS_PHRASE_COMMENTS, payload: comments });
  };
}

// latestCommentIdより後の名言を取得
export function fetchFollowingPhraseComments(phraseId: string, latestCommentId: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhraseCommentsResponse> = await apiPublicClient.get(
      `/phrases/${phraseId}/comments/following?latest_comment_id=${latestCommentId}`
    );

    const comments: PhraseCommentDTO[] = response.data.comments.map(comment => new PhraseCommentDTO(comment));

    dispatch({ type: ADD_FOLLOWING_PHRASE_COMMENTS, payload: comments });
  };
}

export function initializePhraseComments(): InitializePhraseComments {
  return { type: INITIALIZE_PHRASE_COMMENTS };
}
