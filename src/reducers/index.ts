import { combineReducers } from "redux";
import categories, { State as CategoriesState } from "./categories";
import phrases, { State as PhrasesState } from "./phrases";
import subcategories, { State as SubcategoriesState } from "./subcategories";

export interface State {
  phrases: PhrasesState;
  categories: CategoriesState;
  subcategories: SubcategoriesState;
}

export default combineReducers({
  phrases,
  categories,
  subcategories
});
