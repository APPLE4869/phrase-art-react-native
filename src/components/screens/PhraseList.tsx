import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationParams } from "react-navigation";

interface Props {
  navigation: NavigationParams;
}

export default class App extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>PhraseList</Text>
        <Button onPress={() => this.props.navigation.navigate("PhraseDetailScreen")} title="PhraseDetailScreen" />
      </View>
    );
  }
}
