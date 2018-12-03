import * as React from "react";
import { Text } from "react-native";
import { NavigationParams } from "react-navigation";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class InProgressScreen extends React.Component<Props> {
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
        <Text>申請一覧</Text>
      </DefaultTemplate>
    );
  }
}
