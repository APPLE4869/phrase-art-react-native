import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../actions/categories";
import * as SubcategoriesAction from "../../actions/subcategories";
import CategoryDTO from "../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import PhrasesListStatus from "../../models/PhrasesListStatus";
import { State as RootState } from "../../reducers";
import { colors } from "../../styles";

interface Props {
  phrasesListStatus: PhrasesListStatus;
  category: CategoryDTO | undefined;
  subcategory: SubcategoryDTO | undefined;
  initializeSubcategory: any;
  fetchSubcategoryById: any;
  initializeCategory: any;
  fetchCategoryById: any;
}

interface State {}

class CategoryPanelOnList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const {
      phrasesListStatus,
      initializeSubcategory,
      fetchSubcategoryById,
      initializeCategory,
      fetchCategoryById
    } = this.props;

    const { categoryId, subcategoryId } = phrasesListStatus;

    initializeSubcategory();
    initializeCategory();

    if (subcategoryId) {
      fetchSubcategoryById(subcategoryId);
    } else if (categoryId) {
      fetchCategoryById(categoryId);
    }
  }

  render() {
    const { category, subcategory } = this.props;

    if (subcategory) {
      return (
        <View style={styles.container}>
          <Text style={styles.subcategoryName}>{subcategory.name}</Text>
        </View>
      );
    } else if (category) {
      return (
        <View style={styles.container}>
          <Text style={styles.subcategoryName}>{category.name}</Text>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.grayLevel5
  },
  subcategoryName: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: colors.grayLevel1
  }
});

const mapStateToProps = (state: RootState) => ({
  category: state.categories.category,
  subcategory: state.subcategories.subcategory,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {
  initializeSubcategory: SubcategoriesAction.initializeSubcategory,
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById,
  initializeCategory: CategoriesAction.initializeCategory,
  fetchCategoryById: CategoriesAction.fetchCategoryById
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryPanelOnList);
