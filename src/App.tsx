import * as React from "react";
import { StatusBar, View } from "react-native";
import RootNavigator from "./navigators/RootNavigator";
import { colors } from "./styles";

interface Props {}
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <RootNavigator />
      </View>
    );
  }
}
