import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers";

// 永続化の設定
const persistConfig = {
  key: "persist",
  storage: AsyncStorage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

// redux-logger を開発環境でのみ使用する
const middlewares = __DEV__ ? [loggerMiddleware, thunkMiddleware] : [thunkMiddleware];

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
