import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SubcategoryModificationRequestDTO from "../../../models/dto/UpdateRequestList/SubcategoryModificationRequestDTO";
import { UpdateRequestType } from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { colors } from "../../../styles";
import DecisionCounts from "../../atoms/DecisionCounts";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import CommentWithCount from "../../atoms/PhraseItem/CommentWithCount";
import StandardText from "../../atoms/StandardText";
import FinalResult from "../../atoms/UpdateRequest/FinalResult";
import RemainingTime from "../../atoms/UpdateRequest/RemainingTime";
import ReportIcon from "../ReportIcon";

interface Props {
  subcategoryModificationRequest: SubcategoryModificationRequestDTO;
  onPress: (updateRequestId: string, updateRequestType: UpdateRequestType) => void;
  isFirst?: boolean;
}

const MAX_ITEM_TEXT: number = 35;

export default class SubcategoryModificationRequestItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPressAction = this.onPressAction.bind(this);
  }

  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  onPressAction() {
    const { subcategoryModificationRequest, onPress } = this.props;
    onPress(subcategoryModificationRequest.id, subcategoryModificationRequest.type);
  }

  render() {
    const { subcategoryModificationRequest, isFirst } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPressAction}
        activeOpacity={1}
        style={[styles.container, !!isFirst ? styles.firstContainer : {}]}
      >
        <View style={styles.itemTop}>
          {subcategoryModificationRequest.finalDecisionResult ? (
            <FinalResult
              decisionExpiresAt={subcategoryModificationRequest.decisionExpiresAt}
              finalDecisionResult={subcategoryModificationRequest.finalDecisionResult}
            />
          ) : (
            <RemainingTime decisionExpiresAt={subcategoryModificationRequest.decisionExpiresAt} />
          )}
          <ReportIcon reportSymbol="UpdateRequest" reportId={subcategoryModificationRequest.id} />
        </View>
        <InlineCategoryNames
          categoryName={subcategoryModificationRequest.categoryName}
          subcategoryName={subcategoryModificationRequest.subcategoryName}
        />
        <StandardText
          text={
            subcategoryModificationRequest.subcategoryIntroduction
              ? this.itemTextView(subcategoryModificationRequest.subcategoryIntroduction)
              : "未登録"
          }
          fontSize={14}
          textStyle={{ color: colors.grayLevel1, marginTop: 10 }}
        />
        <View style={styles.commentRow}>
          <CommentWithCount count={subcategoryModificationRequest.commentCount} />
        </View>
        <View style={styles.itemBottom}>
          <IconImageWithLabel type={subcategoryModificationRequest.type} />
          <DecisionCounts
            approvedCount={subcategoryModificationRequest.approvedCount}
            rejectedCount={subcategoryModificationRequest.rejectedCount}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLevel4,
    paddingVertical: 23,
    paddingHorizontal: 15
  },
  firstContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.grayLevel4
  },
  itemTop: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },
  commentRow: {
    alignItems: "flex-end"
  }
});
