import * as React from "react";
import { NavigationParams } from "react-navigation";
import EditProfileImage from "../../organisms/Configure/EditProfileImage";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class EditProfileImageScreen extends React.Component<Props> {
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
        <EditProfileImage navigateConfigureIndex={this.navigateNext} />
      </DefaultTemplate>
    );
  }
}
