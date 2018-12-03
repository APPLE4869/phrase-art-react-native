import * as React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/organisms/Support/Loading";
import RootNavigator from "./navigators/RootNavigator";
import { persistor, store } from "./stores";
import { colors } from "./styles";

// providers/apiClientでJWTをheaderに詰める際、Storeを参照できるようにするため。
declare global {
  interface Window {
    store: Store;
  }
}
window.store = store;

interface Props {}
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <Loading />
            <StatusBar backgroundColor={colors.special.navigationBarBackground} barStyle="default" />
            <RootNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
