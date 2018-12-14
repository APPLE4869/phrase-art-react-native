import * as React from "react";
import { WebView } from "react-native";
import { NavigationParams } from "react-navigation";

interface Props {
  navigation: NavigationParams;
}

export default class TermsOfServiceScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <WebView source={{ uri: "https://phrase-art.herokuapp.com/policy" }} />;
  }
}
