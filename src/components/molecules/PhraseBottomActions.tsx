import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../actions/Phrase/phrases";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { State as RootState } from "../../reducers";
import { signinRequestAlert } from "../../support/alert";
import CommentWithCount from "../atoms/PhraseItem/CommentWithCount";
import FavoriteWithCount from "../atoms/PhraseItem/FavoriteWithCount";
import LikeWithCount from "../atoms/PhraseItem/LikeWithCount";

interface Props {
  navigation: NavigationParams;
  auth: any;
  phrase: PhraseDTO;
  likePhrase: any;
  unlikePhrase: any;
  favoritePhrase: any;
  unfavoritePhrase: any;
}

interface State {
  isInProgressLikeAction: boolean;
  isInProgressFavoriteAction: boolean;
}

class PhraseBottomActions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isInProgressLikeAction: false, isInProgressFavoriteAction: false };

    this.likeActivate = this.likeActivate.bind(this);
    this.likeUnactivate = this.likeUnactivate.bind(this);
    this.favoriteActivate = this.favoriteActivate.bind(this);
    this.favoriteUnactivate = this.favoriteUnactivate.bind(this);
  }

  async likeActivate() {
    const { navigation, phrase, likePhrase } = this.props;

    if (this.isNotPermitted()) {
      signinRequestAlert("いいねをする", navigation);
      return;
    }

    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    await likePhrase(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async likeUnactivate() {
    const { navigation, phrase, unlikePhrase } = this.props;

    if (this.isNotPermitted()) {
      signinRequestAlert("いいねをする", navigation);
      return;
    }

    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    await unlikePhrase(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async favoriteActivate() {
    const { navigation, phrase, favoritePhrase } = this.props;

    if (this.isNotPermitted()) {
      signinRequestAlert("お気に入り登録", navigation);
      return;
    }

    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    await favoritePhrase(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  async favoriteUnactivate() {
    const { navigation, phrase, unfavoritePhrase } = this.props;

    if (this.isNotPermitted()) {
      signinRequestAlert("お気に入り登録", navigation);
      return;
    }

    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    await unfavoritePhrase(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  isNotPermitted() {
    const { auth } = this.props;
    return !auth || !auth.jwt;
  }

  render() {
    const { phrase } = this.props;

    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    left: 12,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  likePhrase: PhrasesAction.likePhrase,
  unlikePhrase: PhrasesAction.unlikePhrase,
  favoritePhrase: PhrasesAction.favoritePhrase,
  unfavoritePhrase: PhrasesAction.unfavoritePhrase
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseBottomActions);
