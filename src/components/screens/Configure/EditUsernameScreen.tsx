import * as React from "react";
import { NavigationParams } from "react-navigation";
import EditUsername from "../../organisms/Configure/EditUsername";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class EditUsernameScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.navigateNext = this.navigateNext.bind(this);
  }

  navigateNext() {
    this.props.navigation.navigate("ConfigureIndex");
  }

  render() {
    return (
      <DefaultTemplate>
        <EditUsername navigateConfigureIndex={this.navigateNext} />
      </DefaultTemplate>
    );
  }
}
