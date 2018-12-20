import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../../actions/subcategories";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import CategoryItemForAll from "../../molecules/Category/CategoryItemForAll";
import SubcategoryItem from "../../molecules/Category/SubcategoryItem";

interface Props {
  phrasesListStatus: PhrasesListStatus | undefined;
  categoryId: string;
  subcategories: SubcategoryDTO[];
  fetchSubcategoriesByCategoryId: any;
  initializeSubcategories: any;
  onPress: (category: SubcategoryDTO) => void;
  onPressForAll: () => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
}

class SubcategoryItemList extends React.Component<Props, State> {
  private currentCategoryId: string | undefined;
  private currentSubcategoryId: string | undefined;

  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false };

    this.initialize();
  }

  initialize() {
    const { categoryId, initializeSubcategories, fetchSubcategoriesByCategoryId, phrasesListStatus } = this.props;
    initializeSubcategories();

    // 初期表示用のサブカテゴリーを取得
    fetchSubcategoriesByCategoryId(categoryId);

    if (phrasesListStatus) {
      this.currentCategoryId = phrasesListStatus.categoryId;
      this.currentSubcategoryId = phrasesListStatus.subcategoryId;
    }
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
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  checkedAllSubcategories() {
    const { categoryId } = this.props;
    return this.currentCategoryId === categoryId && !this.currentSubcategoryId;
  }

  render() {
    const { subcategories, onPress, onPressForAll } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={subcategories}
        keyExtractor={(subcategory: SubcategoryDTO) => subcategory.id}
        ListHeaderComponent={
          <CategoryItemForAll
            onPress={onPressForAll}
            checked={this.checkedAllSubcategories()}
            text="すべてのサブカテゴリー"
          />
        }
        renderItem={({ item: subcategory }) => (
          <SubcategoryItem
            subcategory={subcategory}
            onPress={onPress}
            currentSubcategoryId={this.currentSubcategoryId}
          />
        )}
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
  subcategories: state.subcategories.subcategories,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
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
