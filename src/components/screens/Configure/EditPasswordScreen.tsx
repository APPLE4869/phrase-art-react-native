import * as React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { NavigationParams } from "react-navigation";
import { formStyle } from "../../../styles";
import EditPassword from "../../organisms/Configure/EditPassword";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class EditPasswordScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.navigateNext = this.navigateNext.bind(this);
  }

  navigateNext() {
    this.props.navigation.navigate("ConfigureIndex");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={formStyle.keyboardAvoidingView}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <DefaultTemplate>
            <EditPassword navigateConfigureIndex={this.navigateNext} />
          </DefaultTemplate>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
