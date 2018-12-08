import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import PhraseDTO, { PhraseResponse, PhrasesResponse } from "../models/dto/PhraseDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_PHRASE = "ADD_PHRASE:phrases";
export const ADD_PHRASES = "ADD_PHRASES:phrases";
export const ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID = "ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID:phrases";
export const ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID = "ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID:phrases";
export const SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID = "SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID:phrases";
export const INITIALIZE_PHRASES = "INITIALIZE_PHRASES:phrases";
export const INITIALIZE_PHRASES_LIST_STATUS = "INITIALIZE_PHRASES_LIST_STATUS:phrases";

interface AddPhrase {
  type: typeof ADD_PHRASE;
  payload: PhraseDTO;
}

interface AddPhrases {
  type: typeof ADD_PHRASES;
  payload: PhraseDTO[];
}

interface AddPhrasesByCategoryId {
  type: typeof ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID;
  payload: PhraseDTO[];
}

interface AddPhrasesBySubcategoryId {
  type: typeof ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID;
  payload: PhraseDTO[];
}

interface SetPhrasesStatusAbountSubcategoryId {
  type: typeof SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID;
  payload: string;
}

interface InitializePhrases {
  type: typeof INITIALIZE_PHRASES;
}

interface InitializePhrasesListStatus {
  type: typeof INITIALIZE_PHRASES_LIST_STATUS;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddPhrase
  | AddPhrases
  | AddPhrasesByCategoryId
  | AddPhrasesBySubcategoryId
  | SetPhrasesStatusAbountSubcategoryId
  | InitializePhrases
  | InitializePhrasesListStatus;

// ----- 以下、アクションメソッド定義 -----//

// 名言(Phrase)を取得
export function fetchPhrases(offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await apiPublicClient.get(`/phrases?offset=${offset}`);

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

// カテゴリーIDに紐づく名言(Phrase)を取得
export function fetchPhrasesByCategoryId(categoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await apiPublicClient.get(
      `/categories/${categoryId}/phrases?offset=${offset}`
    );

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

// サブカテゴリーIDに紐づく名言(Phrase)を取得
export function fetchPhrasesBySubcategoryId(subcategoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await apiPublicClient.get(
      `/subcategories/${subcategoryId}/phrases?offset=${offset}`
    );

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

export function fetchPhraseById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhraseResponse> = await apiPublicClient.get(`/phrases/${id}`);

    const phrase: PhraseDTO = new PhraseDTO(response.data.phrase);

    dispatch({ type: ADD_PHRASE, payload: phrase });
  };
}

export function setPhrasesStatusAbountSubcategoryId(subcategoryId: string): SetPhrasesStatusAbountSubcategoryId {
  return { type: SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID, payload: subcategoryId };
}

// 取得した名言(Phrases)を初期化
export function initializePhrases(): InitializePhrases {
  return { type: INITIALIZE_PHRASES };
}

// 設定されている名言リストのステータスを初期化
export function initializePhrasesListStatus(): InitializePhrasesListStatus {
  return { type: INITIALIZE_PHRASES_LIST_STATUS };
}
