import {
  Action,
  ADD_PHRASE_DECISION,
  ADD_PHRASE_REGISTRATION_REQUEST,
  CHANGE_DECISION_RESULT,
  INITIALIZE_DECISION,
  INITIALIZE_PHRASE_REGISTRATION_REQUEST
} from "../../actions/UpdateRequest/phraseRegistrationRequest";
import PhraseDecisionDTO from "../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseRegistrationRequestDTO from "../../models/dto/UpdateRequest/PhraseRegistrationRequestDTO";

// Stateの型定義
export interface State {
  readonly phraseRegistrationRequest?: PhraseRegistrationRequestDTO;
  readonly phraseDecision?: PhraseDecisionDTO;
}

// Stateの初期値
export const initialState: State = {
  phraseRegistrationRequest: undefined,
  phraseDecision: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PHRASE_REGISTRATION_REQUEST: {
      return { ...state, phraseRegistrationRequest: action.payload };
    }
    case ADD_PHRASE_DECISION: {
      return { ...state, phraseDecision: action.payload };
    }
    case CHANGE_DECISION_RESULT: {
      return { ...state, phraseDecision: { ...state.phraseDecision, result: action.payload } };
    }
    case INITIALIZE_PHRASE_REGISTRATION_REQUEST: {
      return { ...state, phraseRegistrationRequest: undefined };
    }
    case INITIALIZE_DECISION: {
      return { ...state, phraseDecision: undefined };
    }
    default: {
      return state;
    }
  }
};
