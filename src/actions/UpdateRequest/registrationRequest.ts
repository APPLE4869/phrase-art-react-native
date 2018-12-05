import { AxiosResponse } from "axios";
import ApplicationError from "../../models/ApplicationError";
import { apiPrivateClient } from "../../providers/apiClient";

// ----- 以下、アクションメソッド定義 -----//

// カテゴリー(Category)を取得
export function submitRegisterRequest(
  categoryId: string,
  subcategoryName: string,
  phraseContent: string,
  authorName: string
) {
  return async () => {
    try {
      const response: AxiosResponse = await apiPrivateClient.post("/phrase_update_request/register_request", {
        categoryId,
        subcategoryName,
        phraseContent,
        authorName
      });

      if (response.status !== 200) {
        throw new Error("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
      }
    } catch (e) {
      new ApplicationError(e).alertMessage();

      throw e;
    }
  };
}
