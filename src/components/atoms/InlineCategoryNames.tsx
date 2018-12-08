import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  categoryName: string;
  subcategoryName?: string;
}

export default class CategoryInlineTitles extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { categoryName, subcategoryName } = this.props;

    if (!subcategoryName) {
      return (
        <View style={styles.container}>
          <Text style={styles.categoryName}>{categoryName}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <Image style={{ width: 8, height: 8 }} source={require("../../../assets/images/icon/angle-right-gray2.png")} />
        <Text style={styles.subcategoryName}>{subcategoryName}</Text>
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
    fontSize: 12,
    marginRight: 7
  },
  subcategoryName: {
    color: colors.grayLevel2,
    fontSize: 12,
    marginLeft: 12
  }
});
