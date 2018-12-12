import { apiPublicClient } from "../providers/apiClient";

// ----- 以下、アクションメソッド定義 -----//

export function reportInjustice(userId: string, id: string, symbol: string) {
  return async () => {
    await apiPublicClient.post(`/injustice_reports`, { id, symbol, userId });
  };
}
