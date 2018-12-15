import * as React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { NavigationParams } from "react-navigation";
import DeletionForm from "../../../organisms/UpdateRequestForm/DeletionForm";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { formStyle } from "../../../../styles";

interface Props {
  navigation: NavigationParams;
}

export default class DeletionRequestScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateNextScreen = this.navigateNextScreen.bind(this);
  }

  navigateNextScreen() {
    this.props.navigation.navigate("PhraseList");
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={formStyle.keyboardAvoidingView}>
        <DefaultTemplate>
          <DeletionForm
            phrase={this.props.navigation.getParam("phrase")}
            navigateNextScreen={this.navigateNextScreen}
          />
        </DefaultTemplate>
      </ScrollView>
    );
  }
}
