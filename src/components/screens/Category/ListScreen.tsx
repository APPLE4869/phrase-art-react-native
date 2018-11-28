import * as React from "react";
import { Button } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import CategoryItemList from "../../molecules/CategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  categories: CategoryDTO[];
  fetchCategories: any;
}

class CategoryListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <Button onPress={() => navigation.navigate("Main")} title="キャンセル" color={colors.clickable} />
    };
  };

  constructor(props: Props) {
    super(props);

    this.props.fetchCategories();

    this.navigateSubcategoryList = this.navigateSubcategoryList.bind(this);
  }

  navigateSubcategoryList(categoryId: string) {
    this.props.navigation.navigate("SubcategoryList", { categoryId });
  }

  render() {
    return (
      <DefaultTemplate>
        <CategoryItemList categories={this.props.categories} onPress={this.navigateSubcategoryList} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories
});

const mapDispatchToProps = {
  fetchCategories: CategoriesAction.fetchCategories
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
