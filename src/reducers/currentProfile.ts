import { Action, ADD_CURRENT_PROFILE } from "../actions/currentProfile";
import CurrentProfileDTO from "../models/dto/CurrentProfileDTO";

// Stateの型定義
export interface State {
  readonly currentProfile: CurrentProfileDTO | undefined;
}

// Stateの初期値
export const initialState: State = {
  currentProfile: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CURRENT_PROFILE: {
      return { ...state, currentProfile: action.payload };
    }
    default: {
      return state;
    }
  }
};
