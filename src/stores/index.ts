import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers";

// redux-logger を開発環境でのみ使用する
const middlewares = __DEV__ ? [loggerMiddleware, thunkMiddleware] : [thunkMiddleware];

export default createStore(reducers, applyMiddleware(...middlewares));
