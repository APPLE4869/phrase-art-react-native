import { Action, ADD_MESSAGE, CLEAR_MESSAGE } from "../actions/quickblox";

// Stateの型定義
export interface State {
  readonly message?: string;
}

// Stateの初期値
export const initialState: State = {
  message: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case CLEAR_MESSAGE: {
      return { ...state, message: undefined };
    }
    default: {
      return state;
    }
  }
};
