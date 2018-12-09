import {
  Action,
  ADD_PHRASE_DECISION,
  ADD_PHRASE_DELETION_REQUEST,
  CHANGE_DECISION_RESULT
} from "../../actions/UpdateRequest/phraseDeletionRequest";
import PhraseDecisionDTO from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseDeletionRequestDTO from "../../models/dto/UpdateRequest/PhraseDeletionRequestDTO";

// Stateの型定義
export interface State {
  readonly phraseDeletionRequest?: PhraseDeletionRequestDTO;
  readonly phraseDecision?: PhraseDecisionDTO;
}

// Stateの初期値
export const initialState: State = {
  phraseDeletionRequest: undefined,
  phraseDecision: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PHRASE_DELETION_REQUEST: {
      return { ...state, phraseDeletionRequest: action.payload };
    }
    case ADD_PHRASE_DECISION: {
      return { ...state, phraseDecision: action.payload };
    }
    case CHANGE_DECISION_RESULT: {
      return { ...state, phraseDecision: { ...state.phraseDecision, result: action.payload } };
    }
    default: {
      return state;
    }
  }
};
