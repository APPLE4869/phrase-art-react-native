import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
}

export default class PhraseItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isInProgressLikeAction: false, isInProgressFavoriteAction: false };

    this.navigatePhraseDetail = this.navigatePhraseDetail.bind(this);
    this.likeActivate = this.likeActivate.bind(this);
    this.likeUnactivate = this.likeUnactivate.bind(this);
    this.favoriteActivate = this.favoriteActivate.bind(this);
    this.favoriteUnactivate = this.favoriteUnactivate.bind(this);
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
