import * as React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  isActive: boolean;
  count: number;
  activate: () => void;
  unactivate: () => void;
}

interface State {
  imageSize: any;
  imageLeft: any;
}

const imageDefaultSize = 19;
const imageMaxSize = 24;

export default class LikeWithCount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const animateValue = this.props.isActive ? 2 : 0;
    this.state = { imageSize: new Animated.Value(animateValue), imageLeft: new Animated.Value(animateValue) };

    this.onPress = this.onPress.bind(this);
  }

  imageSize() {
    return this.state.imageSize.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [imageDefaultSize, imageMaxSize, imageDefaultSize]
    });
  }

  imageLeft() {
    return this.state.imageSize.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, (imageDefaultSize - imageMaxSize) / 2, 0]
    });
  }

  onPress() {
    const { isActive, activate, unactivate } = this.props;

    if (isActive) {
      unactivate();
    } else {
      activate();
    }

    const toValue = isActive ? 0 : 2;
    const { imageSize, imageLeft } = this.state;
    Animated.parallel([
      Animated.spring(imageSize, {
        toValue,
        speed: 1.5
      }),
      Animated.spring(imageLeft, {
        toValue,
        speed: 1.5
      })
    ]).start();
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
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: 43 }}
      >
        <Animated.Image
          style={{ width: this.imageSize(), height: this.imageSize(), position: "absolute", left: this.imageLeft() }}
          resizeMode="contain"
          source={this.imageSource()}
        />
        {count > 0 ? <StandardText text={String(count)} fontSize={11} textStyle={{ color: this.textColor() }} /> : null}
      </TouchableOpacity>
    );
  }
}
