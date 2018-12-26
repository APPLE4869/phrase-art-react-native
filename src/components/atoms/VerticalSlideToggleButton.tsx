import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  isShowItem: boolean;
  onSlideUp: () => void;
  onSlideDown: () => void;
}

export default class VerticalSlideToggleButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  imageSource() {
    return this.props.isShowItem
      ? require("../../../assets/images/icon/phrase-detail/angle-up.png")
      : require("../../../assets/images/icon/phrase-detail/angle-down.png");
  }

  onPress() {
    const { isShowItem, onSlideUp, onSlideDown } = this.props;
    return isShowItem ? onSlideUp : onSlideDown;
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.onPress()}
        style={{ alignItems: "center", paddingBottom: 10 }}
      >
        <Image style={{ width: 20, height: 14 }} resizeMode="contain" source={this.imageSource()} />
      </TouchableOpacity>
    );
  }
}
