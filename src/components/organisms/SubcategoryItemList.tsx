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
  onPress: (subcategoryId: string) => void;
}

class SubcategoryItemList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { categoryId } = this.props;
    this.props.fetchSubcategoriesByCategoryId(categoryId);
  }

  render() {
    const { subcategories, onPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={subcategories}
        keyExtractor={(subcategory: SubcategoryDTO) => subcategory.id}
        renderItem={({ item: subcategory }) => <CategoryItem category={subcategory} onPress={onPress} />}
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
  fetchSubcategoriesByCategoryId: SubcategoriesAction.fetchSubcategoriesByCategoryId
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryItemList);
