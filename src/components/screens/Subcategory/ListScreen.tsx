import * as React from "react";
import { Button } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../../actions/subcategories";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import CategoryItemList from "../../molecules/CategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  subcategories: SubcategoryDTO[];
  fetchSubcategoriesByCategoryId: any;
}

class SubcategoryListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <Button onPress={() => navigation.navigate("Main")} title="キャンセル" color={colors.clickable} />
    };
  };

  constructor(props: Props) {
    super(props);

    const categoryId = this.props.navigation.getParam("categoryId");

    this.props.fetchSubcategoriesByCategoryId(categoryId);

    this.navigatePhraseList = this.navigatePhraseList.bind(this);
  }

  navigatePhraseList(subcategoryId: string) {
    const { navigation } = this.props;

    navigation.navigate("Main", { subcategoryId });
  }

  render() {
    return (
      <DefaultTemplate>
        <CategoryItemList categories={this.props.subcategories} onPress={this.navigatePhraseList} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  subcategories: state.subcategories.subcategories
});

const mapDispatchToProps = {
  fetchSubcategoriesByCategoryId: SubcategoriesAction.fetchSubcategoriesByCategoryId
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryListScreen);
