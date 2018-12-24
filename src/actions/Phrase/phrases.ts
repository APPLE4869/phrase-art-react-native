import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import PhraseDTO, { PhraseResponse, PhrasesResponse } from "../../models/dto/PhraseDTO";
import { apiPrivateClient, apiPublicClient } from "../../providers/apiClient";

// Actions
export const ADD_PHRASE = "ADD_PHRASE:phrases";
export const ADD_PHRASES = "ADD_PHRASES:phrases";
export const ADD_FAVORITE_PHRASES = "ADD_FAVORITE_PHRASES:phrases";
export const ADD_SEARCHED_PHRASES = "ADD_SEARCHED_PHRASES:phrases";
export const ADD_SEARCHED_WORD = "ADD_SEARCHED_WORD:phrases";
export const REPLACE_PHRASE = "REPLACE_PHRASE:phrases";
export const REPLACE_PHRASES = "REPLACE_PHRASES:phrases";
export const REPLACE_FAVORITE_PHRASES = "REPLACE_FAVORITE_PHRASES:phrases";
export const REPLACE_SEARCHED_PHRASES = "REPLACE_SEARCHED_PHRASES:phrases";
export const INITIALIZE_PHRASE = "INITIALIZE_PHRASE:phrases";
export const INITIALIZE_PHRASES = "INITIALIZE_PHRASES:phrases";
export const INITIALIZE_FAVORITE_PHRASES = "INITIALIZE_FAVORITE_PHRASES:phrases";
export const INITIALIZE_SEARCHED_PHRASES = "INITIALIZE_SEARCHED_PHRASES:phrases";

interface AddPhrase {
  type: typeof ADD_PHRASE;
  payload: PhraseDTO;
}

interface AddPhrases {
  type: typeof ADD_PHRASES;
  payload: PhraseDTO[];
}

interface AddFavoritePhrases {
  type: typeof ADD_FAVORITE_PHRASES;
  payload: PhraseDTO[];
}

interface AddSearchedPhrases {
  type: typeof ADD_SEARCHED_PHRASES;
  payload: PhraseDTO[];
}

interface AddSearchedWord {
  type: typeof ADD_SEARCHED_WORD;
  payload: string;
}

interface ReplacePhrase {
  type: typeof REPLACE_PHRASE;
  payload: PhraseDTO;
}

interface ReplacePhrases {
  type: typeof REPLACE_PHRASES;
  payload: PhraseDTO;
}

interface ReplaceFavoritePhrases {
  type: typeof REPLACE_FAVORITE_PHRASES;
  payload: PhraseDTO;
}

interface ReplaceSearchedPhrases {
  type: typeof REPLACE_SEARCHED_PHRASES;
  payload: PhraseDTO;
}

interface InitializePhrase {
  type: typeof INITIALIZE_PHRASE;
}

interface InitializePhrases {
  type: typeof INITIALIZE_PHRASES;
}

interface InitializeFavoritePhrases {
  type: typeof INITIALIZE_FAVORITE_PHRASES;
}

interface InitializeSearchedPhrases {
  type: typeof INITIALIZE_SEARCHED_PHRASES;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddPhrase
  | AddPhrases
  | AddFavoritePhrases
  | AddSearchedPhrases
  | AddSearchedWord
  | ReplacePhrase
  | ReplacePhrases
  | ReplaceFavoritePhrases
  | ReplaceSearchedPhrases
  | InitializePhrase
  | InitializePhrases
  | InitializeFavoritePhrases
  | InitializeSearchedPhrases;

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

export function fetchPhrasesBySearchWord(searchWord: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await apiPublicClient.get(
      `/phrases/search?searchWord=${searchWord}&offset=${offset}`
    );

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_SEARCHED_PHRASES, payload: phrases });
  };
}

export function fetchFavoritePhrases(offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<PhrasesResponse> = await apiPrivateClient.get(`/phrases/favorite?offset=${offset}`);

    const phrases: PhraseDTO[] = response.data.phrases.map(phrase => new PhraseDTO(phrase));

    dispatch({ type: ADD_FAVORITE_PHRASES, payload: phrases });
  };
}

export function likePhrase(phrase: PhraseDTO) {
  return async (dispatch: Dispatch<Action>) => {
    await apiPrivateClient.post(`/phrases/${phrase.id}/like`);
    const newPhrase = new PhraseDTO({ ...phrase, likeCount: phrase.likeCount + 1, currentUserLiked: true });

    dispatch({ type: REPLACE_PHRASE, payload: newPhrase });
    dispatch({ type: REPLACE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_FAVORITE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_SEARCHED_PHRASES, payload: newPhrase });
  };
}

export function unlikePhrase(phrase: PhraseDTO) {
  return async (dispatch: Dispatch<Action>) => {
    await apiPrivateClient.post(`/phrases/${phrase.id}/unlike`);
    const newPhrase = new PhraseDTO({ ...phrase, likeCount: phrase.likeCount - 1, currentUserLiked: false });

    dispatch({ type: REPLACE_PHRASE, payload: newPhrase });
    dispatch({ type: REPLACE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_FAVORITE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_SEARCHED_PHRASES, payload: newPhrase });
  };
}

export function favoritePhrase(phrase: PhraseDTO) {
  return async (dispatch: Dispatch<Action>) => {
    await apiPrivateClient.post(`/phrases/${phrase.id}/favorite`);
    const newPhrase = new PhraseDTO({ ...phrase, favoriteCount: phrase.favoriteCount + 1, currentUserFavorited: true });

    dispatch({ type: REPLACE_PHRASE, payload: newPhrase });
    dispatch({ type: REPLACE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_FAVORITE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_SEARCHED_PHRASES, payload: newPhrase });
  };
}

export function unfavoritePhrase(phrase: PhraseDTO) {
  return async (dispatch: Dispatch<Action>) => {
    await apiPrivateClient.post(`/phrases/${phrase.id}/unfavorite`);
    const newPhrase = new PhraseDTO({
      ...phrase,
      favoriteCount: phrase.favoriteCount - 1,
      currentUserFavorited: false
    });

    dispatch({ type: REPLACE_PHRASE, payload: newPhrase });
    dispatch({ type: REPLACE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_FAVORITE_PHRASES, payload: newPhrase });
    dispatch({ type: REPLACE_SEARCHED_PHRASES, payload: newPhrase });
  };
}

// 取得した名言(Phrase)を初期化
export function addSearchedWord(searchWord: string): AddSearchedWord {
  return { type: ADD_SEARCHED_WORD, payload: searchWord };
}

// 取得した名言(Phrase)を初期化
export function initializePhrase(): InitializePhrase {
  return { type: INITIALIZE_PHRASE };
}

// 取得した名言(Phrases)を初期化
export function initializePhrases(): InitializePhrases {
  return { type: INITIALIZE_PHRASES };
}

// 取得した名言(Phrase)を初期化
export function initializeFavoritePhrase(): InitializeFavoritePhrases {
  return { type: INITIALIZE_FAVORITE_PHRASES };
}

// 取得した名言(Phrase)を初期化
export function initializeSearchedPhrase(): InitializeSearchedPhrases {
  return { type: INITIALIZE_SEARCHED_PHRASES };
}
