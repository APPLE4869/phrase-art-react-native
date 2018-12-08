import {
  Action,
  ADD_FINISHED_UPDATE_REQUESTS,
  ADD_REQUESTING_UPDATE_REQUESTS,
  INITIALIZE_FINISHED_UPDATE_REQUESTS,
  INITIALIZE_REQUESTING_UPDATE_REQUESTS
} from "../actions/UpdateRequest/updateRequest";
import UpdateRequestDTO from "../models/dto/UpdateRequest/UpdateRequestDTO";

// Stateの型定義
export interface State {
  readonly requestingUpdateRequests: UpdateRequestDTO[];
  readonly finishedUpdateRequests: UpdateRequestDTO[];
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
