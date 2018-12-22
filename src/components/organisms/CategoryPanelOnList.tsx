import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
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

  imageHeight() {
    const { width: windowWidth } = Dimensions.get("window");
    return windowWidth * 0.4;
  }

  render() {
    const { category, subcategory } = this.props;

    if (subcategory) {
      if (subcategory.imageUrl) {
        return (
          <View style={[styles.containerWithImage, { height: this.imageHeight() }]}>
            <Image
              source={{ uri: subcategory.imageUrl }}
              style={{ position: "absolute", height: "100%", width: "100%", zIndex: -2 }}
            />
            <Image
              style={{ position: "absolute", height: "100%", width: "100%", zIndex: -1 }}
              source={require("../../../assets/images/subcategory-gradient.png")}
            />
            <View style={styles.containerInnerWithImage}>
              <View style={styles.subcategoryItem}>
                <Text style={styles.subcategoryItemCategoryName}>{subcategory.categoryName}</Text>
                <Text style={styles.subcategoryItemSubcategoryName}>{subcategory.name}</Text>
              </View>
              <Image
                style={{ height: 21, width: 13 }}
                source={require("../../../assets/images/icon/angle-down-base.png")}
              />
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.subcategoryItem}>
              <Text style={styles.subcategoryItemCategoryName}>{subcategory.categoryName}</Text>
              <Text style={styles.subcategoryItemSubcategoryName}>{subcategory.name}</Text>
            </View>
            <Image
              style={{ height: 21, width: 13 }}
              source={require("../../../assets/images/icon/angle-down-base.png")}
              resizeMode="stretch"
            />
          </View>
        );
      }
    } else if (category) {
      return (
        <View style={[styles.containerWithImage, { height: this.imageHeight() }]}>
          <Image
            source={{ uri: category.imageUrl }}
            style={{ position: "absolute", height: "100%", width: "100%", zIndex: -2 }}
          />
          <Image
            style={{ position: "absolute", height: "100%", width: "100%", zIndex: -1 }}
            source={require("../../../assets/images/subcategory-gradient.png")}
          />
          <View style={styles.containerInnerWithImage}>
            <View style={styles.subcategoryItem}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          </View>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  containerWithImage: {
    position: "absolute",
    width: "100%",
    zIndex: -1
  },
  containerInnerWithImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    width: "100%",
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
    fontSize: 22,
    fontWeight: "bold",
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
