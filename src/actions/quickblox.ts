// Actions
export const ADD_MESSAGE = "ADD_MESSAGE:quickblox";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE:quickblox";

interface AddMessage {
  type: typeof ADD_MESSAGE;
  payload: string;
}

interface ClearMessage {
  type: typeof CLEAR_MESSAGE;
}

// Reducer用に利用するActionの型を定義
export type Action = AddMessage | ClearMessage;

// ----- 以下、アクションメソッド定義 -----//

export function addMessage(message: string): AddMessage {
  return { type: ADD_MESSAGE, payload: message };
}

export function clearMessage(): ClearMessage {
  return { type: CLEAR_MESSAGE };
}
