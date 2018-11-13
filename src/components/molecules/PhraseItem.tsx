import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Phrase } from "../../lib/phrases";
import { colors } from "../../styles";

interface Props {
  phrase: Phrase;
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
      <TouchableOpacity onPress={() => navigateDetail(phrase.id)} style={styles.item}>
        <Text style={styles.itemGroup}>{phrase.group}</Text>
        <Text style={styles.itemText}>{this.itemTextView(phrase.text)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d7da",
    paddingVertical: 20,
    paddingHorizontal: "5%"
  },
  itemGroup: {
    fontSize: 13,
    marginBottom: 5,
    letterSpacing: 0.8,
    color: colors.grayLevel3
  },
  itemText: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: colors.grayLevel1
  }
});
