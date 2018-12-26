import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import AuthorDTO, { AuthorsResponse } from "../../models/dto/Phrase/AuthorDTO";
import { apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_AUTHOR_CANDIDATES = "ADD_AUTHOR_CANDIDATES:authors";
export const INITIALIZE_AUTHOR_CANDIDATES = "INITIALIZE_AUTHOR_CANDIDATES:authors";

interface AddAuthorCandidates {
  type: typeof ADD_AUTHOR_CANDIDATES;
  payload: AuthorDTO[];
}

interface InitializeAuthorCandidates {
  type: typeof INITIALIZE_AUTHOR_CANDIDATES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddAuthorCandidates | InitializeAuthorCandidates;

// ----- 以下、アクションメソッド定義 -----//

export function fetchAuthorCandidates(word: string, categoryId?: string, subcategoryName?: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<AuthorsResponse> = await apiPublicClient.get(
      `/authors/candidates?word=${word}` +
        (categoryId ? `&categoryId=${categoryId}` : "") +
        (subcategoryName ? `&subcategoryName=${subcategoryName}` : "")
    );

    const authors: AuthorDTO[] = response.data.authors.map(author => new AuthorDTO(author));

    dispatch({ type: ADD_AUTHOR_CANDIDATES, payload: authors });
  };
}

export function initializeAuthorCandidates(): InitializeAuthorCandidates {
  return { type: INITIALIZE_AUTHOR_CANDIDATES };
}
