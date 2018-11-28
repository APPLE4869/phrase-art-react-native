import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import CategoryDTO from "../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import CategoryItem from "../atoms/CategoryItem";

interface Props {
  categories: CategoryDTO[] | SubcategoryDTO[];
  onPress: (categoryId: string) => void;
}

export default class CategoryItemList extends React.Component<Props> {
  render() {
    const { categories, onPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={categories}
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
