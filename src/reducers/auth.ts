import { Action, ADD_CURRENT_USER, ADD_JWT, CLEAR_AUTH } from "../actions/auth";
import CurrentUserDTO from "../models/dto/currentUserDTO";

// Stateの型定義
export interface State {
  readonly jwt: string | undefined;
  readonly currentUser: CurrentUserDTO | undefined;
}

// Stateの初期値
export const initialState: State = {
  jwt: undefined,
  currentUser: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_JWT: {
      return { ...state, jwt: action.payload };
    }
    case ADD_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    case CLEAR_AUTH: {
      return { ...state, jwt: undefined, currentUser: undefined };
    }
    default: {
      return state;
    }
  }
};
