import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import CategoryDTO from "../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import { colors } from "../../styles";

interface Props {
  category: CategoryDTO | SubcategoryDTO;
  onPress: (categoryId: string) => void;
}

export default class CategoryItem extends React.Component<Props> {
  render() {
    const { category, onPress } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress(category.id)} style={styles.item}>
        <Text style={styles.itemText}>{category.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLevel4,
    paddingVertical: 23,
    paddingHorizontal: 15
  },
  itemText: {
    fontSize: 14,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});
