import {
  Action,
  ADD_FOLLOWING_PHRASE_COMMENTS,
  ADD_PREVIOUS_PHRASE_COMMENTS,
  INITIALIZE_PHRASE_COMMENTS
} from "../../actions/Phrase/phraseComment";
import PhraseCommentDTO from "../../models/dto/Phrase/PhraseCommentDTO";

// Stateの型定義
export interface State {
  readonly phraseComments: PhraseCommentDTO[];
}

// Stateの初期値
export const initialState: State = {
  phraseComments: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PREVIOUS_PHRASE_COMMENTS: {
      return { ...state, phraseComments: state.phraseComments.concat(action.payload) };
    }
    case ADD_FOLLOWING_PHRASE_COMMENTS: {
      return { ...state, phraseComments: action.payload.concat(state.phraseComments) };
    }
    case INITIALIZE_PHRASE_COMMENTS: {
      return { ...state, phraseComments: [] };
    }
    default: {
      return state;
    }
  }
};
