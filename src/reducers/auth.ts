import { Action, ADD_JWT, REMOVE_JWT } from "../actions/auth";

// Stateの型定義
export interface State {
  readonly jwt: string | undefined;
}

// Stateの初期値
export const initialState: State = {
  jwt: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_JWT: {
      return { ...state, jwt: action.payload };
    }
    case REMOVE_JWT: {
      return { ...state, jwt: undefined };
    }
    default: {
      return state;
    }
  }
};
