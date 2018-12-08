import { AxiosResponse } from "axios";
import ApplicationError from "../../models/ApplicationError";
import { apiPrivateClient } from "../../providers/apiClient";

// ----- 以下、アクションメソッド定義 -----//

export function approve(updateRequestId: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(`/update_requests/${updateRequestId}/approve`);

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}

export function reject(updateRequestId: string) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post(`/update_requests/${updateRequestId}/reject`);

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}
