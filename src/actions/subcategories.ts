import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import SubcategoryDTO, { SubcategoriesResponse } from "../models/dto/SubcategoryDTO";
import ApiClient from "../providers/ApiClient";

// Actions
export const ADD_SUBCATEGORIES = "ADD_SUBCATEGORIES:categories";
export const INITIALIZE_SUBCATEGORIES = "INITIALIZE_SUBCATEGORIES:categories";

interface AddSubcategories {
  type: typeof ADD_SUBCATEGORIES;
  payload: SubcategoryDTO[];
}

interface InitializeSubcategories {
  type: typeof INITIALIZE_SUBCATEGORIES;
}

// Reducer用に利用するActionの型を定義
export type Action = AddSubcategories | InitializeSubcategories;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function fetchSubcategoriesByCategoryId(categoryId: string, offset: number = 0) {
  return async (dispatch: Dispatch<Action>) => {
    console.log(`/categories/${categoryId}/subcategories?offset=${offset}`);
    const response: AxiosResponse<SubcategoriesResponse> = await ApiClient.get(
      `/categories/${categoryId}/subcategories?offset=${offset}`
    );

    const subcategories: SubcategoryDTO[] = response.data.subcategories.map(
      subcategory => new SubcategoryDTO(subcategory)
    );

    dispatch({ type: ADD_SUBCATEGORIES, payload: subcategories });
  };
}

// 取得したカテゴリー(Category)を初期化
export function initializeSubcategories(): InitializeSubcategories {
  return { type: INITIALIZE_SUBCATEGORIES };
}
