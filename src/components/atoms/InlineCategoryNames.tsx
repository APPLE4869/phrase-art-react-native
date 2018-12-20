import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  categoryName: string;
  subcategoryName?: string;
  isSmallFontSize?: boolean;
}

const MAX_ITEM_TEXT = 15;

export default class CategoryInlineTitles extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  sliceSubcategoryName(subcategoryName: string): string {
    return subcategoryName.length > MAX_ITEM_TEXT ? `${subcategoryName.substr(0, MAX_ITEM_TEXT)}...` : subcategoryName;
  }

  render() {
    const { categoryName, subcategoryName, isSmallFontSize } = this.props;

    if (!subcategoryName) {
      return (
        <View style={styles.container}>
          <Text style={[styles.categoryName, !!isSmallFontSize ? styles.smallFontSize : {}]}>{categoryName}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={[styles.categoryName, !!isSmallFontSize ? styles.smallFontSize : {}]}>{categoryName}</Text>
        <Image style={{ width: 8, height: 8 }} source={require("../../../assets/images/icon/angle-right-gray2.png")} />
        <Text style={[styles.subcategoryName, !!isSmallFontSize ? styles.smallFontSize : {}]}>
          {this.sliceSubcategoryName(subcategoryName)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  categoryName: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginRight: 7
  },
  subcategoryName: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginLeft: 12
  },
  smallFontSize: {
    fontSize: 11
  }
});
