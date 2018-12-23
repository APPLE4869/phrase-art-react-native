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
  isFirst?: boolean;
}

export default class PhraseItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigatePhraseDetail = this.navigatePhraseDetail.bind(this);
  }

  navigatePhraseDetail() {
    const { navigateDetail, phrase } = this.props;
    navigateDetail(phrase.id);
  }

  render() {
    const { phrase, isFirst } = this.props;

    return (
      <TouchableOpacity
        onPress={this.navigatePhraseDetail}
        activeOpacity={1}
        style={[styles.container, !!isFirst ? styles.firstContainer : {}]}
      >
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
    borderBottomColor: colors.grayLevel4,
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  firstContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.grayLevel4
  },
  itemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
