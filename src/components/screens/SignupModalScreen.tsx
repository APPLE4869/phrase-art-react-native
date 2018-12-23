import * as React from "react";
import { NavigationParams } from "react-navigation";
import HeaderMenuButton from "../atoms/HeaderMenuButton";
import Signup from "../organisms/Configure/Signup";
import DefaultTemplate from "../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class SignupScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <HeaderMenuButton onPress={() => navigation.goBack(null)} title="キャンセル" />
    };
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <DefaultTemplate>
        <Signup
          navigateConfigureIndex={() => {
            navigation.goBack(null);
          }}
        />
      </DefaultTemplate>
    );
  }
}
