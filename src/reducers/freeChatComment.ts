import {
  Action,
  ADD_FOLLOWING_FREE_CHAT_COMMENTS,
  ADD_PREVIOUS_FREE_CHAT_COMMENTS,
  INITIALIZE_FREE_CHAT_COMMENTS
} from "../actions/freeChatComment";
import FreeChatCommentDTO from "../models/dto/FreeChatCommentDTO";

// Stateの型定義
export interface State {
  readonly freeChatComments: FreeChatCommentDTO[];
}

// Stateの初期値
export const initialState: State = {
  freeChatComments: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PREVIOUS_FREE_CHAT_COMMENTS: {
      return { ...state, freeChatComments: state.freeChatComments.concat(action.payload) };
    }
    case ADD_FOLLOWING_FREE_CHAT_COMMENTS: {
      return { ...state, freeChatComments: action.payload.concat(state.freeChatComments) };
    }
    case INITIALIZE_FREE_CHAT_COMMENTS: {
      return { ...state, freeChatComments: [] };
    }
    default: {
      return state;
    }
  }
};
