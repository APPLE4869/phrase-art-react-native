import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import { colors } from "../../styles";

interface Props {
  subcategory: SubcategoryDTO | undefined;
}

interface State {}

export default class CategoryPanelOnList extends React.Component<Props, State> {
  render() {
    const { subcategory } = this.props;

    if (!subcategory) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.subcategoryName}>{subcategory.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.grayLevel5
  },
  subcategoryName: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: colors.grayLevel1
  }
});
