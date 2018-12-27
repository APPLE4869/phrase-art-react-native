import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  onPress: () => void;
  title: string;
  arrowLeftElm?: any;
  hiddenRightArrow?: boolean;
  isFirst?: boolean;
}

export default class ConfigureIndexItem extends React.Component<Props> {
  render() {
    const { onPress, title, arrowLeftElm, hiddenRightArrow, isFirst } = this.props;

    return (
      <TouchableOpacity style={[styles.item, isFirst ? styles.isFirst : {}]} activeOpacity={1} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
        <View style={styles.rightArea}>
          {arrowLeftElm}
          {!!hiddenRightArrow ? null : (
            <Image
              style={{ marginLeft: 20, height: 14, width: 14 }}
              source={require("../../../assets/images/icon/angle-right-gray2.png")}
            />
          )}
        </View>
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
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  isFirst: {
    borderTopWidth: 1,
    borderTopColor: colors.grayLevel4
  },
  itemText: {
    fontSize: 15,
    letterSpacing: 1.5,
    color: colors.baseBlack
  },
  rightArea: {
    flexDirection: "row",
    alignItems: "center"
  }
});
