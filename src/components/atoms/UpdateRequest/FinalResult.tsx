import moment from "moment";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../styles";
import StandardText from "../StandardText";

interface Props {
  decisionExpiresAt: string;
  finalDecisionResult: string;
}

const minutes = 60;
const day = minutes * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

export default class FinalResult extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  remainingTime(decisionExpiresAt: string): number {
    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return currentMoment.diff(decisionExpiresAtMoment, "minutes");
  }

  remainingTimeView(remainingTime: number): string {
    if (remainingTime < 0) {
      return "-";
    } else if (remainingTime < minutes) {
      // 分単位
      return `${String(remainingTime)}分`;
    } else if (remainingTime < day) {
      // 時間単位
      return `${String(Math.floor(remainingTime / minutes))}時間`;
    } else if (remainingTime < week) {
      // 日にち単位
      return `${String(Math.floor(remainingTime / day))}日`;
    } else if (remainingTime < month) {
      // 週単位
      return `${String(Math.floor(remainingTime / week))}週間`;
    } else if (remainingTime < year) {
      // 月単位
      return `${String(Math.floor(remainingTime / month))}ヶ月`;
    } else {
      // 年単位
      return `${String(Math.floor(remainingTime / year))}年`;
    }
  }

  render() {
    const { decisionExpiresAt, finalDecisionResult } = this.props;
    const remainingTime = this.remainingTime(decisionExpiresAt);

    if (remainingTime < 0) {
      return <StandardText text="未確定" fontSize={11} />;
    }

    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          {finalDecisionResult === "approve" ? (
            <View style={[styles.batch, styles.approvedBatch]}>
              <Text style={styles.batchText}>承認</Text>
            </View>
          ) : (
            <View style={[styles.batch, styles.rejectedBatch]}>
              <Text style={styles.batchText}>否認</Text>
            </View>
          )}
          <StandardText
            text={`${this.remainingTimeView(remainingTime)}前 確定`}
            fontSize={10}
            textStyle={{ color: colors.grayLevel1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  batch: {
    alignItems: "center",
    borderRadius: 5,
    width: 53,
    paddingVertical: 4,
    marginRight: 8
  },
  approvedBatch: {
    backgroundColor: colors.special.approve
  },
  rejectedBatch: {
    backgroundColor: colors.special.reject
  },
  batchText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2
  }
});
