import * as React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { NavigationParams } from "react-navigation";
import { formStyle } from "../../../../styles";
import SubcategoryModificationForm from "../../../organisms/UpdateRequestForm/SubcategoryModificationForm";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class SubcategoryModificationRequestScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateNextScreen = this.navigateNextScreen.bind(this);
  }

  navigateNextScreen() {
    this.props.navigation.navigate("SubcategoryDetail");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={formStyle.keyboardAvoidingView}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <DefaultTemplate>
            <SubcategoryModificationForm
              subcategoryId={this.props.navigation.getParam("subcategoryId")}
              navigateNextScreen={this.navigateNextScreen}
            />
          </DefaultTemplate>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}