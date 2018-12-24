import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PhraseUpdateRequestDTO from "../../../models/dto/UpdateRequestList/PhraseUpdateRequestDTO";
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
  phraseUpdateRequest: PhraseUpdateRequestDTO;
  onPress: (updateRequestId: string, updateRequestType: UpdateRequestType) => void;
  isFirst?: boolean;
}

const MAX_ITEM_TEXT: number = 35;

export default class PhraseUpdateRequestItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPressAction = this.onPressAction.bind(this);
  }

  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  onPressAction() {
    const { phraseUpdateRequest, onPress } = this.props;
    onPress(phraseUpdateRequest.id, phraseUpdateRequest.type);
  }

  render() {
    const { phraseUpdateRequest, isFirst } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPressAction}
        activeOpacity={1}
        style={[styles.container, !!isFirst ? styles.firstContainer : {}]}
      >
        <View style={styles.itemTop}>
          {phraseUpdateRequest.finalDecisionResult ? (
            <FinalResult
              decisionExpiresAt={phraseUpdateRequest.decisionExpiresAt}
              finalDecisionResult={phraseUpdateRequest.finalDecisionResult}
            />
          ) : (
            <RemainingTime decisionExpiresAt={phraseUpdateRequest.decisionExpiresAt} />
          )}
          <ReportIcon reportSymbol="UpdateRequest" reportId={phraseUpdateRequest.id} />
        </View>
        <InlineCategoryNames
          categoryName={phraseUpdateRequest.categoryName}
          subcategoryName={phraseUpdateRequest.subcategoryName}
        />
        <StandardText
          text={this.itemTextView(phraseUpdateRequest.phraseContent)}
          fontSize={14}
          textStyle={{ color: colors.grayLevel1, marginVertical: 10 }}
        />
        <View style={styles.authorAndCommentRow}>
          <StandardText
            text={phraseUpdateRequest.phraseAuthorName}
            fontSize={12}
            textStyle={{ color: colors.grayLevel1 }}
          />
          <CommentWithCount count={phraseUpdateRequest.commentCount} />
        </View>
        <View style={styles.itemBottom}>
          <IconImageWithLabel type={phraseUpdateRequest.type} />
          <DecisionCounts
            approvedCount={phraseUpdateRequest.approvedCount}
            rejectedCount={phraseUpdateRequest.rejectedCount}
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
  authorAndCommentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
