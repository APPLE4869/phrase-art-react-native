import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { colors } from "../../styles";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import StandardText from "../atoms/StandardText";
import ReportIcon from "./ReportIcon";

interface Props {
  phrase: PhraseDTO;
  navigateDetail: (phraseId: string) => void;
}

export default class PhraseItem extends React.Component<Props> {
  render() {
    const { navigateDetail, phrase } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateDetail(phrase.id)} activeOpacity={1} style={styles.container}>
        <View style={styles.itemTop}>
          <InlineCategoryNames categoryName={phrase.categoryName} subcategoryName={phrase.subcategoryName} />
          <ReportIcon reportSymbol="Phrase" reportId={phrase.id} />
        </View>
        <StandardText text={phrase.content} fontSize={14} textStyle={{ marginVertical: 10 }} />
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
  },
  itemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
