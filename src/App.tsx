import * as React from "react";
import { StatusBar, View } from "react-native";
import RootNavigator from "./navigators/RootNavigator";

interface Props {}
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor={"red"} barStyle="light-content" />
        <RootNavigator />
      </View>
    );
  }
}
