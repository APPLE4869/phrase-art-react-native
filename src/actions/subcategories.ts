import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import SubcategoryDTO, { SubcategoriesResponse, SubcategoryResponse } from "../models/dto/SubcategoryDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_SUBCATEGORIES = "ADD_SUBCATEGORIES:subcategories";
export const ADD_SUBCATEGORY = "ADD_SUBCATEGORY:subcategories";
export const ADD_SUBCATEGORY_CANDIDATES = "ADD_SUBCATEGORY_CANDIDATES:subcategories";
export const INITIALIZE_SUBCATEGORIES = "INITIALIZE_SUBCATEGORIES:subcategories";
export const INITIALIZE_SUBCATEGORY = "INITIALIZE_SUBCATEGORY:subcategories";
export const INITIALIZE_SUBCATEGORY_CANDIDATES = "INITIALIZE_SUBCATEGORY_CANDIDATES:subcategories";

interface AddSubcategories {
  type: typeof ADD_SUBCATEGORIES;
  payload: SubcategoryDTO[];
}

interface AddSubcategory {
  type: typeof ADD_SUBCATEGORY;
  payload: SubcategoryDTO;
}

interface AddSubcategoryCandidates {
  type: typeof ADD_SUBCATEGORY_CANDIDATES;
  payload: SubcategoryDTO[];
}

interface InitializeSubcategories {
  type: typeof INITIALIZE_SUBCATEGORIES;
}

interface InitializeSubcategory {
  type: typeof INITIALIZE_SUBCATEGORY;
}

interface InitializeSubcategoryCandidates {
  type: typeof INITIALIZE_SUBCATEGORY_CANDIDATES;
}

// Reducer用に利用するActionの型を定義
export type Action =
  | AddSubcategories
  | AddSubcategory
  | AddSubcategoryCandidates
  | InitializeSubcategories
  | InitializeSubcategory
  | InitializeSubcategoryCandidates;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function fetchSubcategoriesByCategoryId(categoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<SubcategoriesResponse> = await apiPublicClient.get(
      `/categories/${categoryId}/subcategories?offset=${offset}`
    );

    const subcategories: SubcategoryDTO[] = response.data.subcategories.map(
      subcategory => new SubcategoryDTO(subcategory)
    );

    dispatch({ type: ADD_SUBCATEGORIES, payload: subcategories });
  };
}

export function fetchSubcategoryById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<SubcategoryResponse> = await apiPublicClient.get(`/subcategories/${id}`);

    const subcategory: SubcategoryDTO = new SubcategoryDTO(response.data.subcategory);

    dispatch({ type: ADD_SUBCATEGORY, payload: subcategory });
  };
}

export function fetchSubcategoryCandidates(word: string, categoryId?: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<SubcategoriesResponse> = await apiPublicClient.get(
      `/subcategories/candidates?word=${word}` + (categoryId ? `&categoryId=${categoryId}` : "")
    );

    const subcategories: SubcategoryDTO[] = response.data.subcategories.map(
      subcategory => new SubcategoryDTO(subcategory)
    );

    dispatch({ type: ADD_SUBCATEGORY_CANDIDATES, payload: subcategories });
  };
}

// 取得したカテゴリー(Category)を初期化
export function initializeSubcategories(): InitializeSubcategories {
  return { type: INITIALIZE_SUBCATEGORIES };
}

// 取得したカテゴリー(Category)を初期化
export function initializeSubcategory(): InitializeSubcategory {
  return { type: INITIALIZE_SUBCATEGORY };
}

// 取得したカテゴリー(Category)を初期化
export function initializeSubcategoryCandidates(): InitializeSubcategoryCandidates {
  return { type: INITIALIZE_SUBCATEGORY_CANDIDATES };
}
