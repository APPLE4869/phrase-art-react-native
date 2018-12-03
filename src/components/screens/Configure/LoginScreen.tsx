import * as React from "react";
import { NavigationParams } from "react-navigation";
import Login from "../../organisms/Configure/Login";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class LoginScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <DefaultTemplate>
        <Login
          navigateConfigureIndex={() => {
            navigation.navigate("ConfigureIndex");
          }}
        />
      </DefaultTemplate>
    );
  }
}
