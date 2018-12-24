import {
  Action,
  ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS,
  ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS,
  INITIALIZE_UPDATE_REQUEST_COMMENTS
} from "../../actions/UpdateRequest/updateRequestComment";
import UpdateRequestCommentDTO from "../../models/dto/UpdateRequest/UpdateRequestCommentDTO";

// Stateの型定義
export interface State {
  readonly updateRequestComments: UpdateRequestCommentDTO[];
}

// Stateの初期値
export const initialState: State = {
  updateRequestComments: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_FOLLOWING_UPDATE_REQUEST_COMMENTS: {
      return { ...state, updateRequestComments: state.updateRequestComments.concat(action.payload) };
    }
    case ADD_PREVIOUS_UPDATE_REQUEST_COMMENTS: {
      return { ...state, updateRequestComments: action.payload.concat(state.updateRequestComments) };
    }
    case INITIALIZE_UPDATE_REQUEST_COMMENTS: {
      return { ...state, updateRequestComments: [] };
    }
    default: {
      return state;
    }
  }
};
