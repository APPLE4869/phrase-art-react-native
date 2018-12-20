import * as React from "react";
import { Text } from "react-native";
import { colors } from "../../styles";

interface Props {
  text: string;
  fontSize: 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  textStyle?: object;
}

export default class StandardText extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  styleConfigure() {
    const { fontSize, textStyle } = this.props;
    const styleWrapper = textStyle || {};

    return {
      fontSize,
      lineHeight: Math.round(fontSize * 15) / 10, // 小数第一まで有効
      letterSpacing: Math.round(fontSize * 0.7) / 10, // 小数第一まで有効
      color: colors.baseBlack,
      ...styleWrapper
    };
  }

  render() {
    const { text } = this.props;

    return <Text style={[this.styleConfigure()]}>{text}</Text>;
  }
}
