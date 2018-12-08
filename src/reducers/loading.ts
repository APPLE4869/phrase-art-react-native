import { Action, END_LOADING, START_LOADING } from "../actions/loading";

// Stateの型定義
export interface State {
  readonly loading: boolean;
}

// Stateの初期値
export const initialState: State = {
  loading: false
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, loading: true };
    }
    case END_LOADING: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};
