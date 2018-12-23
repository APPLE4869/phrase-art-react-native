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

export default class LikeWithCount extends React.Component<Props> {
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
      return require("../../../../assets/images/icon/phrase-item/like.png");
    }
    return require("../../../../assets/images/icon/phrase-item/unlike.png");
  }

  textColor() {
    const { isActive } = this.props;

    if (isActive) {
      return colors.danger;
    }
    return colors.grayLevel1;
  }

  render() {
    const { count } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={1}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 43 }}
      >
        <Image style={{ width: 19, height: 19 }} resizeMode="contain" source={this.imageSource()} />
        {count > 0 ? <StandardText text={String(count)} fontSize={11} textStyle={{ color: this.textColor() }} /> : null}
      </TouchableOpacity>
    );
  }
}
