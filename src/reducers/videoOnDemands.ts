import { Action, ADD_VIDEO_ON_DEMANDS } from "../actions/videoOnDemands";
import VideoOnDemandDTO from "../models/dto/VideoOnDemandDTO";

// Stateの型定義
export interface State {
  readonly videoOnDemands: VideoOnDemandDTO[];
}

// Stateの初期値
export const initialState: State = {
  videoOnDemands: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_VIDEO_ON_DEMANDS: {
      return { ...state, videoOnDemands: action.payload };
    }
    default: {
      return state;
    }
  }
};
