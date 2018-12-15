import { CategoryType, PhrasesListStatusProperty } from "../../models/PhrasesListStatus";

// Actions
export const SET_PHRASES_LIST_STATUS = "SET_PHRASES_LIST_STATUS:phrasesListStatus";
export const INITIALIZE_PHRASES_LIST_STATUS = "INITIALIZE_PHRASES_LIST_STATUS:phrasesListStatus";

interface SetPhrasesListStatusAboutSubcategoryId {
  type: typeof SET_PHRASES_LIST_STATUS;
  payload: PhrasesListStatusProperty;
}

interface InitializePhrasesListStatus {
  type: typeof INITIALIZE_PHRASES_LIST_STATUS;
}

// Reducer用に利用するActionの型を定義
export type Action = SetPhrasesListStatusAboutSubcategoryId | InitializePhrasesListStatus;

// ----- 以下、アクションメソッド定義 -----//

export function setPhrasesListStatus(
  categoryType: CategoryType,
  categoryId?: string,
  subcategoryId?: string
): SetPhrasesListStatusAboutSubcategoryId {
  return { type: SET_PHRASES_LIST_STATUS, payload: { categoryType, categoryId, subcategoryId } };
}

// 設定されている名言リストのステータスを初期化
export function initializePhrasesListStatus(): InitializePhrasesListStatus {
  return { type: INITIALIZE_PHRASES_LIST_STATUS };
}
