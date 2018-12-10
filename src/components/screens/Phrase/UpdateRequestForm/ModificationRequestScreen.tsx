import * as React from "react";
import { NavigationParams } from "react-navigation";
import ModificationForm from "../../../organisms/UpdateRequestForm/ModificationForm";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class ModificationRequestScreen extends React.Component<Props> {
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
        <ModificationForm
          phrase={this.props.navigation.getParam("phrase")}
          navigateNextScreen={() => {
            this.props.navigation.navigate("PhraseList");
          }}
        />
      </DefaultTemplate>
    );
  }
}
