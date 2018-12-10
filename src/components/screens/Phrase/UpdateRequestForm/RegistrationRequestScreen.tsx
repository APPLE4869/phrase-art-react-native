import * as React from "react";
import { NavigationParams } from "react-navigation";
import RegistrationForm from "../../../organisms/UpdateRequestForm/RegistrationForm";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class RegistrationRequestScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateSubcategoryList = this.navigateSubcategoryList.bind(this);
  }

  navigateSubcategoryList(categoryId: string) {
    this.props.navigation.navigate("SubcategoryList", { categoryId });
  }

  render() {
    return (
      <DefaultTemplate>
        <RegistrationForm
          navigateNextScreen={() => {
            this.props.navigation.navigate("PhraseList");
          }}
        />
      </DefaultTemplate>
    );
  }
}
