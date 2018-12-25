import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { NavigationParams } from "react-navigation";
import { formStyle } from "../../../../styles";
import RegistrationForm from "../../../organisms/UpdateRequestForm/RegistrationForm";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class RegistrationRequestScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateNextScreen = this.navigateNextScreen.bind(this);
  }

  navigateNextScreen() {
    this.props.navigation.navigate("PhraseList");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={formStyle.keyboardAvoidingView} enabled={Platform.OS === "ios"}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <DefaultTemplate>
            <RegistrationForm navigateNextScreen={this.navigateNextScreen} />
          </DefaultTemplate>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
