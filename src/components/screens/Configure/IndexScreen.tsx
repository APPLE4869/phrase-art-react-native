import * as React from "react";
import { Button, View } from "react-native";
import { NavigationParams } from "react-navigation";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class IndexScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <DefaultTemplate>
        <View>
          <Button
            title="ログイン"
            onPress={() => {
              navigation.navigate("ConfigureLogin");
            }}
          />
          <Button
            title="会員登録"
            onPress={() => {
              navigation.navigate("ConfigureSignup");
            }}
          />
        </View>
      </DefaultTemplate>
    );
  }
}
