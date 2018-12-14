import {
  Action,
  ADD_PHRASE_DECISION,
  ADD_PHRASE_MODIFICATION_REQUEST,
  CHANGE_DECISION_RESULT,
  INITIALIZE_DECISION,
  INITIALIZE_PHRASE_MODIFICATION_REQUEST
} from "../../actions/UpdateRequest/phraseModificationRequest";
import PhraseDecisionDTO from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseModificationRequestDTO from "../../models/dto/UpdateRequest/PhraseModificationRequestDTO";

// Stateの型定義
export interface State {
  readonly phraseModificationRequest?: PhraseModificationRequestDTO;
  readonly phraseDecision?: PhraseDecisionDTO;
}

// Stateの初期値
export const initialState: State = {
  phraseModificationRequest: undefined,
  phraseDecision: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PHRASE_MODIFICATION_REQUEST: {
      return { ...state, phraseModificationRequest: action.payload };
    }
    case ADD_PHRASE_DECISION: {
      return { ...state, phraseDecision: action.payload };
    }
    case CHANGE_DECISION_RESULT: {
      return { ...state, phraseDecision: { ...state.phraseDecision, result: action.payload } };
    }
    case INITIALIZE_PHRASE_MODIFICATION_REQUEST: {
      return { ...state, phraseModificationRequest: undefined };
    }
    case INITIALIZE_DECISION: {
      return { ...state, phraseDecision: undefined };
    }
    default: {
      return state;
    }
  }
};
