import * as React from "react";
import { View } from "react-native";
import { colors } from "../../styles";
import StandardText from "../atoms/StandardText";

interface Props {
  approvedCount: number;
  rejectedCount: number;
}

export default class DecisionCounts extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { approvedCount, rejectedCount } = this.props;

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StandardText text="承認数" fontSize={11} textStyle={{ color: colors.grayLevel1 }} />
        <StandardText text={String(approvedCount)} fontSize={18} textStyle={{ marginLeft: 25 }} />
        <StandardText text="否認数" fontSize={11} textStyle={{ color: colors.grayLevel1, marginLeft: 35 }} />
        <StandardText text={String(rejectedCount)} fontSize={18} textStyle={{ marginLeft: 25 }} />
      </View>
    );
  }
}
