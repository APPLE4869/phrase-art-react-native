import * as React from "react";
import { Button } from "react-native";
import { NavigationParams } from "react-navigation";
import { colors } from "../../../styles";
import SubcategoryItemList from "../../organisms/SubcategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class CategoryListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <Button onPress={() => navigation.navigate("Main")} title="キャンセル" color={colors.clickable} />
    };
  };

  constructor(props: Props) {
    super(props);

    this.navigateSubcategoryList = this.navigateSubcategoryList.bind(this);
  }

  navigateSubcategoryList(categoryId: string) {
    this.props.navigation.navigate("Main", { categoryId });
  }

  render() {
    const categoryId: string = this.props.navigation.getParam("categoryId");

    return (
      <DefaultTemplate>
        <SubcategoryItemList categoryId={categoryId} onPress={this.navigateSubcategoryList} />
      </DefaultTemplate>
    );
  }
}
