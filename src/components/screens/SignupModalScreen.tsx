import * as React from "react";
import { Platform, View } from "react-native";
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
      headerRight: (
        <View style={{ marginRight: Platform.OS === "android" ? 15 : 0 }}>
          <HeaderMenuButton onPress={() => navigation.goBack(null)} title="キャンセル" />
        </View>
      )
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
