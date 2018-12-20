import {
  Action,
  ADD_SUBCATEGORY_MODIFICATION_REQUEST,
  ADD_UPDATE_REQUEST_DECISION,
  CHANGE_DECISION_RESULT,
  INITIALIZE_DECISION,
  INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST
} from "../../actions/UpdateRequest/subcategoryModificationRequest";
import SubcategoryModificationRequestDTO from "../../models/dto/UpdateRequest/SubcategoryModificationRequestDTO";
import UpdateRequestDecisionDTO from "../../models/dto/UpdateRequest/UpdateRequestDecisionDTO";

// Stateの型定義
export interface State {
  readonly subcategoryModificationRequest?: SubcategoryModificationRequestDTO;
  readonly updateRequestDecision?: UpdateRequestDecisionDTO;
}

// Stateの初期値
export const initialState: State = {
  subcategoryModificationRequest: undefined,
  updateRequestDecision: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SUBCATEGORY_MODIFICATION_REQUEST: {
      return { ...state, subcategoryModificationRequest: action.payload };
    }
    case ADD_UPDATE_REQUEST_DECISION: {
      return { ...state, updateRequestDecision: action.payload };
    }
    case CHANGE_DECISION_RESULT: {
      return { ...state, updateRequestDecision: { ...state.updateRequestDecision, result: action.payload } };
    }
    case INITIALIZE_SUBCATEGORY_MODIFICATION_REQUEST: {
      return { ...state, subcategoryModificationRequest: undefined };
    }
    case INITIALIZE_DECISION: {
      return { ...state, updateRequestDecision: undefined };
    }
    default: {
      return state;
    }
  }
};
