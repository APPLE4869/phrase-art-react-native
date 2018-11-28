import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../actions/categories";
import CategoryDTO from "../../models/dto/CategoryDTO";
import { State as RootState } from "../../reducers";
import CategoryItem from "../molecules/CategoryItem";

interface Props {
  categories: CategoryDTO[];
  fetchCategories: any;
  initializeCategories: any;
  onPress: (categoryId: string) => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
}

class CategoryItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false };

    this.fetchCategoriesWithAwait = this.fetchCategoriesWithAwait.bind(this);

    const { initializeCategories, fetchCategories } = this.props;

    initializeCategories();

    // 初期表示用のカテゴリーを取得
    fetchCategories();
  }

  async fetchCategoriesWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { fetchCategories, categories } = this.props;

    this.setState({ loading: true });

    const offset: number = categories.length;
    await fetchCategories(offset);

    if (this.props.categories.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  render() {
    const { categories, onPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={categories}
        keyExtractor={(category: CategoryDTO) => category.id}
        renderItem={({ item: category }) => <CategoryItem category={category} onPress={onPress} />}
        onEndReached={() => this.fetchCategoriesWithAwait()}
        onEndReachedThreshold={3}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories
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
