import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { colors } from "../../styles";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import StandardText from "../atoms/StandardText";

interface Props {
  phrase: PhraseDTO;
  navigateDetail: (phraseId: string) => void;
}

const MAX_ITEM_TEXT: number = 35;

export default class PhraseItem extends React.Component<Props> {
  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  render() {
    const { navigateDetail, phrase } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateDetail(phrase.id)} activeOpacity={1} style={styles.container}>
        <InlineCategoryNames categoryName={phrase.categoryName} subcategoryName={phrase.subcategoryName} />
        <StandardText text={this.itemTextView(phrase.content)} fontSize={14} textStyle={{ marginVertical: 10 }} />
        <StandardText text={phrase.authorName} fontSize={12} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: colors.grayLevel4
  }
});
