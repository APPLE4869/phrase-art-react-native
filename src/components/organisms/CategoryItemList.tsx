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
  onPress: (categoryId: string) => void;
}

class CategoryItemList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.fetchCategories();
  }

  render() {
    const { categories, onPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={categories}
        keyExtractor={(category: CategoryDTO) => category.id}
        renderItem={({ item: category }) => <CategoryItem category={category} onPress={onPress} />}
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
  fetchCategories: CategoriesAction.fetchCategories
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryItemList);
