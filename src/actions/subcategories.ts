import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import SubcategoryDTO, { SubcategoriesResponse } from "../models/dto/SubcategoryDTO";
import ApiClient from "../providers/ApiClient";

// Actions
export const ADD_SUBCATEGORIES = "ADD_SUBCATEGORIES:categories";

interface AddSubcategories {
  type: typeof ADD_SUBCATEGORIES;
  payload: SubcategoryDTO[];
}

// Reducer用に利用するActionの型を定義
export type Action = AddSubcategories;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function fetchSubcategoriesByCategoryId(categoryId: string) {
  return async (dispatch: Dispatch<Action>) => {
    console.log(categoryId);
    const response: AxiosResponse<SubcategoriesResponse> = await ApiClient.get(
      `/categories/${categoryId}/subcategories`
    );

    const subcategories: SubcategoryDTO[] = response.data.subcategories.map(
      subcategory => new SubcategoryDTO(subcategory)
    );

    dispatch({ type: ADD_SUBCATEGORIES, payload: subcategories });
  };
}
