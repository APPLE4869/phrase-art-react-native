import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import CategoryDTO from "../../models/dto/CategoryDTO";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import { colors } from "../../styles";

interface Props {
  category: CategoryDTO | SubcategoryDTO;
  onPress: (categoryId: string) => void;
  currentCategoryId?: string | undefined;
}

export default class CategoryItem extends React.Component<Props> {
  render() {
    const { category, currentCategoryId, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress(category.id)} style={styles.item}>
        <Text style={styles.itemText}>{category.name}</Text>
        {currentCategoryId && currentCategoryId === category.id ? (
          <Image
            style={{ width: 20, height: 20, bottom: 3 }}
            source={require("../../../assets/images/icon/clickable-check.png")}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLevel4,
    paddingVertical: 23,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontSize: 14,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});
