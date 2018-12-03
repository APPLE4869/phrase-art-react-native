import * as React from "react";
import { NavigationParams } from "react-navigation";
import Signup from "../../organisms/Configure/Signup";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class SignupScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <DefaultTemplate>
        <Signup
          navigateConfigureIndex={() => {
            navigation.navigate("ConfigureIndex");
          }}
        />
      </DefaultTemplate>
    );
  }
}
