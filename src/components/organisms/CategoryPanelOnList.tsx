import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../actions/categories";
import * as SubcategoriesAction from "../../actions/subcategories";
import CategoryDTO from "../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import PhrasesListStatus from "../../models/PhrasesListStatus";
import { State as RootState } from "../../reducers";
import { colors } from "../../styles";

interface Props {
  navigateSubcategoryDetail: (subcategoryId: string) => void;
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

    this.navigateSubcategoryDetail = this.navigateSubcategoryDetail.bind(this);

    const { categoryId, subcategoryId } = this.props.phrasesListStatus;
    this.initializeCategory(categoryId, subcategoryId);
  }

  componentDidUpdate(prevProps: Props) {
    const { categoryId: prevCategoryId, subcategoryId: prevSubcategoryId } = prevProps.phrasesListStatus;
    const { categoryId: currentCategoryId, subcategoryId: currentSubcategoryId } = this.props.phrasesListStatus;
    if (prevCategoryId !== currentCategoryId || prevSubcategoryId !== currentSubcategoryId) {
      this.initializeCategory(currentCategoryId, currentSubcategoryId);
    }
  }

  initializeCategory(categoryId?: string, subcategoryId?: string) {
    const { initializeSubcategory, fetchSubcategoryById, initializeCategory, fetchCategoryById } = this.props;

    initializeSubcategory();
    initializeCategory();

    if (subcategoryId) {
      fetchSubcategoryById(subcategoryId);
    } else if (categoryId) {
      fetchCategoryById(categoryId);
    }
  }

  navigateSubcategoryDetail() {
    const { subcategoryId } = this.props.phrasesListStatus;
    if (subcategoryId) {
      this.props.navigateSubcategoryDetail(subcategoryId);
    }
  }

  render() {
    const { category, subcategory } = this.props;

    if (subcategory) {
      return (
        <TouchableOpacity onPress={this.navigateSubcategoryDetail} activeOpacity={0.8} style={styles.container}>
          <View style={styles.subcategoryItem}>
            <Text style={styles.subcategoryItemCategoryName}>{subcategory.categoryName}</Text>
            <Text style={styles.subcategoryItemSubcategoryName}>{subcategory.name}</Text>
          </View>
          <Image
            style={{ height: 21, width: 13 }}
            source={require("../../../assets/images/icon/angle-down-base.png")}
          />
        </TouchableOpacity>
      );
    } else if (category) {
      return (
        <View style={styles.container}>
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.grayLevel5
  },
  subcategoryItem: {},
  subcategoryItemCategoryName: {
    fontSize: 13,
    color: colors.baseBlack,
    marginBottom: 5
  },
  subcategoryItemSubcategoryName: {
    fontSize: 16,
    color: colors.baseBlack,
    fontWeight: "bold"
  },
  categoryName: {
    fontSize: 20,
    color: colors.baseBlack
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
