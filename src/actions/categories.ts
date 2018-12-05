import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import CategoryDTO, { CategoriesResponse } from "../models/dto/CategoryDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_CATEGORIES = "ADD_CATEGORIES:categories";
export const INITIALIZE_CATEGORIES = "INITIALIZE_CATEGORIES:categories";

interface AddCategories {
  type: typeof ADD_CATEGORIES;
  payload: CategoryDTO[];
}

interface InitializeCategories {
  type: typeof INITIALIZE_CATEGORIES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddCategories | InitializeCategories;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function fetchCategories() {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<CategoriesResponse> = await apiPublicClient.get("/categories");

    const categories: CategoryDTO[] = response.data.categories.map(category => new CategoryDTO(category));

    dispatch({ type: ADD_CATEGORIES, payload: categories });
  };
}

// 取得したカテゴリー(Category)を初期化
export function initializeCategories(): InitializeCategories {
  return { type: INITIALIZE_CATEGORIES };
}
