import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import PhraseDTO, { PhraseResponse, PhrasesResponse } from "../models/dto/PhraseDTO";
import ApiClient from "../providers/ApiClient";

// Actions
export const ADD_PHRASE = "ADD_PHRASE:phrases";
export const ADD_PHRASES = "ADD_PHRASES:phrases";
export const ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID = "ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID:phrases";
export const ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID = "ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID:phrases";
export const INITIALIZE_PHRASES = "INITIALIZE_PHRASES:phrases";

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

interface InitializePhrases {
  type: typeof INITIALIZE_PHRASES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddPhrase | AddPhrases | AddPhrasesByCategoryId | AddPhrasesBySubcategoryId | InitializePhrases;

// ----- 以下、アクションメソッド定義 -----//

// 名言(Phrase)を取得
export function fetchPhrases(offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await ApiClient.get(`/phrases?offset=${offset}`);

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

// カテゴリーIDに紐づく名言(Phrase)を取得
export function fetchPhrasesByCategoryId(categoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await ApiClient.get(
      `/categories/${categoryId}/phrases?offset=${offset}`
    );

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

// サブカテゴリーIDに紐づく名言(Phrase)を取得
export function fetchPhrasesBySubcategoryId(subcategoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await ApiClient.get(
      `/subcategories/${subcategoryId}/phrases?offset=${offset}`
    );

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_PHRASES, payload: phrases });
  };
}

export function fetchPhraseById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhraseResponse> = await ApiClient.get(`/phrases/${id}`);

    const phrase: PhraseDTO = new PhraseDTO(response.data.phrase);

    dispatch({ type: ADD_PHRASE, payload: phrase });
  };
}

// 取得した名言(Phrases)を初期化
export function initializePhrases(): InitializePhrases {
  return { type: INITIALIZE_PHRASES };
}
