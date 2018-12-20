import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

interface Props {
  onPress: () => void;
  title: string;
  hiddenRightArrow?: boolean;
}

export default class ConfigureIndexItem extends React.Component<Props> {
  render() {
    const { onPress, title, hiddenRightArrow } = this.props;

    return (
      <TouchableOpacity style={styles.item} activeOpacity={1} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
        {!!hiddenRightArrow ? null : (
          <Image
            style={{ height: 14, width: 14 }}
            source={require("../../../assets/images/icon/angle-right-gray2.png")}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "5%",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLevel4,
    paddingVertical: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemText: {
    fontSize: 15,
    letterSpacing: 1.5,
    color: colors.baseBlack
  }
});
