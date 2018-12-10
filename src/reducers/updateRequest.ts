import {
  Action,
  ADD_FINISHED_UPDATE_REQUESTS,
  ADD_REQUESTING_UPDATE_REQUESTS,
  INITIALIZE_FINISHED_UPDATE_REQUESTS,
  INITIALIZE_REQUESTING_UPDATE_REQUESTS
} from "../actions/UpdateRequest/updateRequestList";
import PhraseUpdateRequestDTO from "../models/dto/UpdateRequestList/PhraseUpdateRequestDTO";
import SubcategoryModificationRequestDTO from "../models/dto/UpdateRequestList/SubcategoryModificationRequestDTO";

// Stateの型定義
export interface State {
  readonly requestingUpdateRequests: Array<PhraseUpdateRequestDTO | SubcategoryModificationRequestDTO>;
  readonly finishedUpdateRequests: Array<PhraseUpdateRequestDTO | SubcategoryModificationRequestDTO>;
}

// Stateの初期値
export const initialState: State = {
  requestingUpdateRequests: [],
  finishedUpdateRequests: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_REQUESTING_UPDATE_REQUESTS: {
      return { ...state, requestingUpdateRequests: state.requestingUpdateRequests.concat(action.payload) };
    }
    case ADD_FINISHED_UPDATE_REQUESTS: {
      return { ...state, finishedUpdateRequests: state.finishedUpdateRequests.concat(action.payload) };
    }
    case INITIALIZE_REQUESTING_UPDATE_REQUESTS: {
      return { ...state, requestingUpdateRequests: [] };
    }
    case INITIALIZE_FINISHED_UPDATE_REQUESTS: {
      return { ...state, finishedUpdateRequests: [] };
    }
    default: {
      return state;
    }
  }
};
