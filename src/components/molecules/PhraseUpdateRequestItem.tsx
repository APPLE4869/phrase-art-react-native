import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import UpdateRequestDTO, {
  PhraseUpdateRequestType,
  UpdateRequestType
} from "../../models/dto/UpdateRequest/UpdateRequestDTO";
import { colors } from "../../styles";
import DecisionCounts from "../atoms/DecisionCounts";
import IconImageWithLabel from "../atoms/IconImageWithLabel";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import RemainingTime from "../atoms/RemainingTime";
import StandardText from "../atoms/StandardText";

interface Props {
  updateRequest: UpdateRequestDTO;
  onPress: (
    updateRequestId: string,
    updateRequestType: UpdateRequestType,
    phraseUpdateRequestType: PhraseUpdateRequestType
  ) => void;
}

const MAX_ITEM_TEXT: number = 35;

export default class PhraseUpdateRequestItem extends React.Component<Props> {
  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  render() {
    const { updateRequest, onPress } = this.props;

    if (updateRequest.updateRequestType === "PhraseUpdateRequest") {
      return (
        <TouchableOpacity
          onPress={() =>
            onPress(updateRequest.id, updateRequest.updateRequestType, updateRequest.phraseUpdateRequestType)
          }
          activeOpacity={1}
          style={styles.container}
        >
          <View style={styles.itemTop}>
            <InlineCategoryNames
              categoryName={updateRequest.categoryName}
              subcategoryName={updateRequest.subcategoryName}
            />
            <RemainingTime decisionExpiresAt={updateRequest.decisionExpiresAt} />
          </View>
          <StandardText
            text={this.itemTextView(updateRequest.phraseContent)}
            fontSize={14}
            textStyle={{ color: colors.grayLevel1, marginVertical: 10 }}
          />
          <StandardText text={updateRequest.authorName} fontSize={12} textStyle={{ color: colors.grayLevel1 }} />
          <View style={styles.itemBottom}>
            <IconImageWithLabel type={updateRequest.phraseUpdateRequestType} />
            <DecisionCounts approvedCount={updateRequest.approvedCount} rejectedCount={updateRequest.rejectedCount} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
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
