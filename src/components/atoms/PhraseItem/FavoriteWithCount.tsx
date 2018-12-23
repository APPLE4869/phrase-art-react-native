import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  isActive: boolean;
  count: number;
  activate: () => void;
  unactivate: () => void;
}

export default class FavoriteWithCount extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { isActive, activate, unactivate } = this.props;

    if (isActive) {
      unactivate();
    } else {
      activate();
    }
  }

  imageSource() {
    const { isActive } = this.props;

    if (isActive) {
      return require("../../../../assets/images/icon/phrase-item/favorite.png");
    }
    return require("../../../../assets/images/icon/phrase-item/unfavorite.png");
  }

  textColor() {
    const { isActive } = this.props;

    if (isActive) {
      return "#FFA500";
    }
    return colors.grayLevel1;
  }

  render() {
    const { count } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={1}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 42 }}
      >
        <Image style={{ width: 21, height: 21 }} resizeMode="contain" source={this.imageSource()} />
        {count > 0 ? <StandardText text={String(count)} fontSize={11} textStyle={{ color: this.textColor() }} /> : null}
      </TouchableOpacity>
    );
  }
}
