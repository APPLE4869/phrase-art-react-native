import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import CategoryCard from "../../molecules/Category/CategoryCard";
import CategoryItem from "../../molecules/Category/CategoryItem";

interface Props {
  phrasesListStatus: PhrasesListStatus | undefined;
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

    const { categories, phrasesListStatus, fetchCategories } = this.props;

    if (categories.length === 0) {
      // 初期表示用のカテゴリーを取得
      fetchCategories();
    }

    if (phrasesListStatus) {
      this.currentCategoryId = phrasesListStatus.categoryId;
    }
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  render() {
    const { categories, onPress, onPressForAll } = this.props;

    if (!categories) {
      return null;
    }

    return (
      <FlatList
        style={styles.container}
        data={categories}
        keyExtractor={(category: CategoryDTO) => category.id}
        ListHeaderComponent={
          <View style={{ marginTop: 10 }}>
            <CategoryCard
              onPress={onPressForAll}
              checked={!this.currentCategoryId}
              name="すべてのカテゴリー"
              imageSource={require("../../../../assets/images/white-wall.png")}
            />
          </View>
        }
        renderItem={({ item: category }) => (
          <CategoryItem category={category} currentCategoryId={this.currentCategoryId} onPress={onPress} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.special.baseBackground
  }
});

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
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
