import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import VideoOnDemandDTO, { VideoOnDemandsResponse } from "../models/dto/VideoOnDemandDTO";
import { apiPublicClient } from "../providers/apiClient";

// Actions
export const ADD_VIDEO_ON_DEMANDS = "ADD_VIDEO_ON_DEMANDS:videOnDemands";

interface AddVideOnDemands {
  type: typeof ADD_VIDEO_ON_DEMANDS;
  payload: VideoOnDemandDTO[];
}

// Reducer用に利用するActionの型を定義
export type Action = AddVideOnDemands;

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(VideOnDemands)を取得
export function fetchVideoOnDemands() {
  return async (dispatch: Dispatch<Action>) => {
    const response: AxiosResponse<VideoOnDemandsResponse> = await apiPublicClient.get("/video_on_demands");

    const videoOnDemands: VideoOnDemandDTO[] = response.data.videoOnDemands.map(
      videoOnDemand => new VideoOnDemandDTO(videoOnDemand)
    );

    dispatch({ type: ADD_VIDEO_ON_DEMANDS, payload: videoOnDemands });
  };
}
