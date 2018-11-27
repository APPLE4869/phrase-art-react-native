import * as React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import RootNavigator from "./navigators/RootNavigator";
import store from "./stores";
import { colors } from "./styles";

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
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <StatusBar backgroundColor={colors.special.navigationBarBackground} barStyle="default" />
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
