import * as React from "react";
import { NavigationParams } from "react-navigation";
import Chatting from "../../organisms/Configure/Chatting";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class ChattingScreen extends React.Component<Props> {
  render() {
    return (
      <DefaultTemplate>
        <Chatting navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}
