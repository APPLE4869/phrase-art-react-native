// Actions
export const START_LOADING = "START_LOADING:loading";
export const END_LOADING = "END_LOADING:loading";

interface StartLoading {
  type: typeof START_LOADING;
}

interface EndLoading {
  type: typeof END_LOADING;
}

// Reducer用に利用するActionの型を定義
export type Action = StartLoading | EndLoading;

// ----- 以下、アクションメソッド定義 -----//

export function startLoading(): StartLoading {
  return { type: START_LOADING };
}

export function endLoading(): EndLoading {
  return { type: END_LOADING };
}
