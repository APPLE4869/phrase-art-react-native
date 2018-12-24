import * as React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { colors } from "../../styles";
import InlineCategoryNames from "../atoms/InlineCategoryNames";
import CommentWithCount from "../atoms/PhraseItem/CommentWithCount";
import FavoriteWithCount from "../atoms/PhraseItem/FavoriteWithCount";
import LikeWithCount from "../atoms/PhraseItem/LikeWithCount";
import StandardText from "../atoms/StandardText";
import ReportIcon from "./ReportIcon";

interface Props {
  phrase: PhraseDTO;
  navigateDetail: (phraseId: string) => void;
  isFirst?: boolean;
  likeAction: (phrase: PhraseDTO) => void;
  unlikeAction: (phrase: PhraseDTO) => void;
  favoriteAction: (phrase: PhraseDTO) => void;
  unfavoriteAction: (phrase: PhraseDTO) => void;
}

interface State {
  isInProgressLikeAction: boolean;
  isInProgressFavoriteAction: boolean;
  isScrollViewAtContent: boolean;
}

export default class PhraseItem extends React.Component<Props, State> {
  private contentHeightThreshold: number;

  constructor(props: Props) {
    super(props);

    this.state = { isInProgressLikeAction: false, isInProgressFavoriteAction: false, isScrollViewAtContent: false };

    this.navigatePhraseDetail = this.navigatePhraseDetail.bind(this);
    this.likeActivate = this.likeActivate.bind(this);
    this.likeUnactivate = this.likeUnactivate.bind(this);
    this.favoriteActivate = this.favoriteActivate.bind(this);
    this.favoriteUnactivate = this.favoriteUnactivate.bind(this);
    this.onLayoutOfContent = this.onLayoutOfContent.bind(this);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.3;
  }

  navigatePhraseDetail() {
    const { navigateDetail, phrase } = this.props;
    navigateDetail(phrase.id);
  }

  async likeActivate() {
    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    const { phrase, likeAction } = this.props;
    await likeAction(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async likeUnactivate() {
    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    const { phrase, unlikeAction } = this.props;
    await unlikeAction(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async favoriteActivate() {
    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    const { phrase, favoriteAction } = this.props;
    await favoriteAction(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  async favoriteUnactivate() {
    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    const { phrase, unfavoriteAction } = this.props;
    await unfavoriteAction(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  onLayoutOfContent(e: any) {
    if (this.contentHeightThreshold < e.nativeEvent.layout.height) {
      this.setState({ isScrollViewAtContent: true });
    }
  }

  render() {
    const { phrase, isFirst } = this.props;
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
        <View style={styles.itemBottom}>
          <CommentWithCount count={phrase.commentCount} />
          <LikeWithCount
            activate={this.likeActivate}
            unactivate={this.likeUnactivate}
            isActive={phrase.currentUserLiked}
            count={phrase.likeCount}
          />
          <FavoriteWithCount
            activate={this.favoriteActivate}
            unactivate={this.favoriteUnactivate}
            isActive={phrase.currentUserFavorited}
            count={phrase.favoriteCount}
          />
        </View>
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
