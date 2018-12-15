import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import CategoryDTO, { CategoriesResponse, CategoryResponse } from "../models/dto/CategoryDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_CATEGORY = "ADD_CATEGORY:categories";
export const ADD_CATEGORIES = "ADD_CATEGORIES:categories";
export const INITIALIZE_CATEGORY = "INITIALIZE_CATEGORY:categories";
export const INITIALIZE_CATEGORIES = "INITIALIZE_CATEGORIES:categories";

interface AddCategory {
  type: typeof ADD_CATEGORY;
  payload: CategoryDTO;
}

interface AddCategories {
  type: typeof ADD_CATEGORIES;
  payload: CategoryDTO[];
}

interface InitializeCategory {
  type: typeof INITIALIZE_CATEGORY;
}

interface InitializeCategories {
  type: typeof INITIALIZE_CATEGORIES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddCategory | AddCategories | InitializeCategory | InitializeCategories;

// ----- 以下、アクションメソッド定義 -----//

export function fetchCategoryById(id: string) {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<CategoryResponse> = await apiPublicClient.get(`/categories/${id}`);

    const category: CategoryDTO = new CategoryDTO(response.data.category);

    dispatch({ type: ADD_CATEGORY, payload: category });
  };
}

// カテゴリー(Category)を取得
export function fetchCategories() {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<CategoriesResponse> = await apiPublicClient.get("/categories");

    const categories: CategoryDTO[] = response.data.categories.map(category => new CategoryDTO(category));

    dispatch({ type: ADD_CATEGORIES, payload: categories });
  };
}

// 取得したカテゴリー(Category)を初期化
export function initializeCategory(): InitializeCategory {
  return { type: INITIALIZE_CATEGORY };
}

// 取得したカテゴリー(Category)を初期化
export function initializeCategories(): InitializeCategories {
  return { type: INITIALIZE_CATEGORIES };
}
