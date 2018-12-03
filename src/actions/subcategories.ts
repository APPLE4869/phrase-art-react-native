import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import SubcategoryDTO, { SubcategoriesResponse, SubcategoryResponse } from "../models/dto/SubcategoryDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_SUBCATEGORIES = "ADD_SUBCATEGORIES:categories";
export const ADD_SUBCATEGORY = "ADD_SUBCATEGORY:categories";
export const INITIALIZE_SUBCATEGORIES = "INITIALIZE_SUBCATEGORIES:categories";

interface AddSubcategories {
  type: typeof ADD_SUBCATEGORIES;
  payload: SubcategoryDTO[];
}

interface AddSubcategory {
  type: typeof ADD_SUBCATEGORY;
  payload: SubcategoryDTO;
}

interface InitializeSubcategories {
  type: typeof INITIALIZE_SUBCATEGORIES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddSubcategories | AddSubcategory | InitializeSubcategories;

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

// 取得したカテゴリー(Category)を初期化
export function initializeSubcategories(): InitializeSubcategories {
  return { type: INITIALIZE_SUBCATEGORIES };
}
