import * as React from "react";
import { Text } from "react-native";
import { NavigationParams } from "react-navigation";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class LoginScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <DefaultTemplate>
        <Text>login</Text>
      </DefaultTemplate>
    );
  }
}
