import moment from "moment";
import * as React from "react";
import { View } from "react-native";
import { colors } from "../../styles";
import StandardText from "../atoms/StandardText";

interface Props {
  decisionExpiresAt: string;
}

export default class RemainingTime extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  remainingTime(decisionExpiresAt: string): number {
    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes");
  }

  render() {
    const remainingTime = this.remainingTime(this.props.decisionExpiresAt);

    if (remainingTime < 0) {
      return <StandardText text="判定待ち" fontSize={10} />;
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StandardText text="残り時間" fontSize={10} textStyle={{ color: colors.grayLevel1, marginRight: 20 }} />
        <StandardText text={String(remainingTime)} fontSize={13} textStyle={{ marginRight: 3 }} />
        <StandardText text="分" fontSize={10} textStyle={{ color: colors.grayLevel1 }} />
      </View>
    );
  }
}
