import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import { colors } from "../../../styles";

interface Props {
  subcategory: SubcategoryDTO;
  onPress: (category: SubcategoryDTO) => void;
  currentSubcategoryId?: string | undefined;
}

export default class SubcategoryItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { subcategory, onPress } = this.props;
    onPress(subcategory);
  }

  render() {
    const { subcategory, currentSubcategoryId } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={styles.item}>
        <Text style={styles.itemText}>{subcategory.name}</Text>
        {currentSubcategoryId && currentSubcategoryId === subcategory.id ? (
          <Image
            style={{ width: 20, height: 20, bottom: 3 }}
            source={require("../../../../assets/images/icon/clickable-check.png")}
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
    fontSize: 15,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});
