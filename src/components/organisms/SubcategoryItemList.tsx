import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../actions/subcategories";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../reducers";
import CategoryItem from "../molecules/CategoryItem";

interface Props {
  categoryId: string;
  subcategories: SubcategoryDTO[];
  fetchSubcategoriesByCategoryId: any;
  initializeSubcategories: any;
  onPress: (subcategoryId: string) => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
}

class SubcategoryItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false };

    const { categoryId, fetchSubcategoriesByCategoryId, initializeSubcategories } = this.props;

    initializeSubcategories();

    // 初期表示用のサブカテゴリーを取得
    fetchSubcategoriesByCategoryId(categoryId);
  }

  async fetchSubcategoriesWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { categoryId, fetchSubcategoriesByCategoryId, subcategories } = this.props;

    this.setState({ loading: true });

    const offset: number = subcategories.length;
    await fetchSubcategoriesByCategoryId(categoryId, offset);

    if (this.props.subcategories.length === offset) {
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  render() {
    const { subcategories, onPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={subcategories}
        keyExtractor={(subcategory: SubcategoryDTO) => subcategory.id}
        renderItem={({ item: subcategory }) => <CategoryItem category={subcategory} onPress={onPress} />}
        onEndReached={() => this.fetchSubcategoriesWithAwait()}
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
  subcategories: state.subcategories.subcategories
});

const mapDispatchToProps = {
  fetchSubcategoriesByCategoryId: SubcategoriesAction.fetchSubcategoriesByCategoryId,
  initializeSubcategories: SubcategoriesAction.initializeSubcategories
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryItemList);
