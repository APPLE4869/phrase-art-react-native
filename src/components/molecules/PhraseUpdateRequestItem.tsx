import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PhraseUpdateRequestDTO from "../../models/dto/UpdateRequestList/PhraseUpdateRequestDTO";
import { UpdateRequestType } from "../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { colors } from "../../styles";
import DecisionCounts from "../atoms/DecisionCounts";
import IconImageWithLabel from "../atoms/IconImageWithLabel";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import RemainingTime from "../atoms/RemainingTime";
import StandardText from "../atoms/StandardText";

interface Props {
  phraseUpdateRequest: PhraseUpdateRequestDTO;
  onPress: (updateRequestId: string, updateRequestType: UpdateRequestType) => void;
}

const MAX_ITEM_TEXT: number = 35;

export default class PhraseUpdateRequestItem extends React.Component<Props> {
  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  render() {
    const { phraseUpdateRequest, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={() => onPress(phraseUpdateRequest.id, phraseUpdateRequest.type)}
        activeOpacity={1}
        style={styles.container}
      >
        <View style={styles.itemTop}>
          <InlineCategoryNames
            categoryName={phraseUpdateRequest.categoryName}
            subcategoryName={phraseUpdateRequest.subcategoryName}
          />
          <RemainingTime decisionExpiresAt={phraseUpdateRequest.decisionExpiresAt} />
        </View>
        <StandardText
          text={this.itemTextView(phraseUpdateRequest.phraseContent)}
          fontSize={14}
          textStyle={{ color: colors.grayLevel1, marginVertical: 10 }}
        />
        <StandardText
          text={phraseUpdateRequest.phraseAuthorName}
          fontSize={12}
          textStyle={{ color: colors.grayLevel1 }}
        />
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
  itemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  }
});
