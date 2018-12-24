import * as React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { colors } from "../../styles";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import StandardText from "../atoms/StandardText";
import PhraseBottomActions from "../molecules/PhraseBottomActions";
import ReportIcon from "./ReportIcon";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO;
  navigateDetail: (phraseId: string) => void;
  isFirst?: boolean;
}

interface State {
  isScrollViewAtContent: boolean;
}

export default class PhraseItem extends React.Component<Props, State> {
  private contentHeightThreshold: number;

  constructor(props: Props) {
    super(props);

    this.state = { isScrollViewAtContent: false };

    this.navigatePhraseDetail = this.navigatePhraseDetail.bind(this);
    this.onLayoutOfContent = this.onLayoutOfContent.bind(this);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.3;
  }

  navigatePhraseDetail() {
    const { navigateDetail, phrase } = this.props;
    navigateDetail(phrase.id);
  }

  onLayoutOfContent(e: any) {
    if (this.contentHeightThreshold < e.nativeEvent.layout.height) {
      this.setState({ isScrollViewAtContent: true });
    }
  }

  render() {
    const { phrase, navigation, isFirst } = this.props;
    const { isScrollViewAtContent } = this.state;

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
        {isScrollViewAtContent ? (
          <View style={{ width: "100%", marginVertical: 10 }}>
            <StandardText text={phrase.content} fontSize={14} textStyle={{ height: this.contentHeightThreshold }} />
            <Text style={{ textAlign: "center", lineHeight: 5, color: colors.grayLevel2 }}>
              .{"\n"}.{"\n"}.
            </Text>
          </View>
        ) : (
          <StandardText
            text={phrase.content}
            fontSize={14}
            textStyle={{ marginVertical: 10 }}
            onLayout={this.onLayoutOfContent}
          />
        )}
        <StandardText text={phrase.authorName} fontSize={12} />
        <PhraseBottomActions navigation={navigation} phrase={phrase} />
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
  },
  itemBottom: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
