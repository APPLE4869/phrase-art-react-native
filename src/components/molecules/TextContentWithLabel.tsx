import * as React from "react";
import { View } from "react-native";
import { colors } from "../../styles";
import StandardText from "../atoms/StandardText";

interface Props {
  label: string;
  content: string;
  marginTop?: 30;
  marginBottom?: 30 | 40;
}

export default class TextContentWithLabel extends React.Component<Props> {
  render() {
    const { label, content, marginTop, marginBottom } = this.props;

    return (
      <View style={{ marginTop: marginTop || 0, marginBottom: marginBottom || 30 }}>
        <StandardText text={label} fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
        <StandardText text={content} fontSize={14} />
      </View>
    );
  }
}
