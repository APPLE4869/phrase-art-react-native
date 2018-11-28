import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import CategoryDTO, { CategoriesResponse } from "../models/dto/CategoryDTO";
import ApiClient from "../providers/ApiClient";

// Actions
export const ADD_CATEGORIES = "ADD_CATEGORIES:categories";

interface AddCategories {
  type: typeof ADD_CATEGORIES;
  payload: CategoryDTO[];
}

// Reducer用に利用するActionの型を定義
export type Action = AddCategories;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function fetchCategories() {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<CategoriesResponse> = await ApiClient.get("/categories");

    const categories: CategoryDTO[] = response.data.categories.map(category => new CategoryDTO(category));

    dispatch({ type: ADD_CATEGORIES, payload: categories });
  };
}
