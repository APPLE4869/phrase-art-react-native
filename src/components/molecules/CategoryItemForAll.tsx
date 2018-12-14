import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

interface Props {
  onPress: () => void;
  checked: boolean;
  text: string;
}

export default class CategoryItemForAll extends React.Component<Props> {
  render() {
    const { onPress, checked, text } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress()} style={styles.item}>
        <Text style={styles.itemText}>{text}</Text>
        {checked ? (
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
    fontSize: 15,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});
