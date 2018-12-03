import { combineReducers } from "redux";
import auth, { State as AuthState } from "./auth";
import categories, { State as CategoriesState } from "./categories";
import loading, { State as LoadingState } from "./loading";
import phrases, { State as PhrasesState } from "./phrases";
import subcategories, { State as SubcategoriesState } from "./subcategories";

export interface State {
  phrases: PhrasesState;
  categories: CategoriesState;
  subcategories: SubcategoriesState;
  auth: AuthState;
  loading: LoadingState;
}

export default combineReducers({
  phrases,
  categories,
  subcategories,
  auth,
  loading
});
