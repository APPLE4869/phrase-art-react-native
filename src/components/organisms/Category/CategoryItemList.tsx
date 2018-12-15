import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../../reducers";
import CategoryItem from "../../molecules/Category/CategoryItem";
import CategoryItemForAll from "../../molecules/Category/CategoryItemForAll";

interface Props {
  subcategory: SubcategoryDTO | undefined;
  categories: CategoryDTO[];
  fetchCategories: any;
  initializeCategories: any;
  onPress: (category: CategoryDTO) => void;
  onPressForAll: () => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
}

class CategoryItemList extends React.Component<Props, State> {
  private currentCategoryId: string | undefined;

  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false };

    const { categories, subcategory, fetchCategories } = this.props;

    if (categories.length === 0) {
      // 初期表示用のカテゴリーを取得
      fetchCategories();
    }

    if (subcategory) {
      this.currentCategoryId = subcategory.categoryId;
    }
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  render() {
    const { categories, onPress, onPressForAll } = this.props;

    return (
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          style={styles.container}
          data={categories}
          keyExtractor={(category: CategoryDTO) => category.id}
          ListHeaderComponent={
            <CategoryItemForAll onPress={onPressForAll} checked={!this.currentCategoryId} text="すべてのカテゴリー" />
          }
          renderItem={({ item: category }) => (
            <CategoryItem category={category} currentCategoryId={this.currentCategoryId} onPress={onPress} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  subcategory: state.subcategories.subcategory
});

const mapDispatchToProps = {
  fetchCategories: CategoriesAction.fetchCategories,
  initializeCategories: CategoriesAction.initializeCategories
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryItemList);
