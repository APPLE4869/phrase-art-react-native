import * as React from "react";
import { NavigationParams } from "react-navigation";
import DefaultTemplate from "../../templates/DefaultTemplate";
import { WebView, View } from "react-native";

interface Props {
  navigation: NavigationParams;
}

export default class TermsOfServiceScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <WebView
        source={{uri: 'https://phrase-art.herokuapp.com/policy'}}
      />
    );
  }
}
