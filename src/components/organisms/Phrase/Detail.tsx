import * as React from "react";
import { Keyboard, Platform, StyleSheet, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhraseCommentAction from "../../../actions/Phrase/phraseComment";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseCommentDTO from "../../../models/dto/Phrase/PhraseCommentDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { signinRequestAlert } from "../../../support/alert";
import { replaceDateStringForIOS } from "../../../support/replace";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import CommentWithCount from "../../atoms/PhraseItem/CommentWithCount";
import FavoriteWithCount from "../../atoms/PhraseItem/FavoriteWithCount";
import LikeWithCount from "../../atoms/PhraseItem/LikeWithCount";
import StandardText from "../../atoms/StandardText";
import Chat from "../../molecules/Chat";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO | undefined;
  fetchPhraseById: any; // typeof PhrasesAction.fetchPhraseById;
  auth: any;
  submitComment: any;
  phraseComments: PhraseCommentDTO[];
  fetchPreviousPhraseComments: any;
  fetchFollowingPhraseComments: any;
  likePhrase: any;
  unlikePhrase: any;
  favoritePhrase: any;
  unfavoritePhrase: any;
  initializePhraseComments: any;
  initializePhrase: any;
}

interface State {
  isInProgressLikeAction: boolean;
  isInProgressFavoriteAction: boolean;
}

class Detail extends React.Component<Props, State> {
  private firstFetchCommentId: string = "";

  constructor(props: Props) {
    super(props);

    this.state = { isInProgressLikeAction: false, isInProgressFavoriteAction: false };

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.initializePhrase();
    this.props.fetchPhraseById(phraseId);

    this.onSendComment = this.onSendComment.bind(this);
    this.likeActivate = this.likeActivate.bind(this);
    this.likeUnactivate = this.likeUnactivate.bind(this);
    this.favoriteActivate = this.favoriteActivate.bind(this);
    this.favoriteUnactivate = this.favoriteUnactivate.bind(this);

    this.initializeComments(phraseId);
  }

  async initializeComments(phraseId: string) {
    this.props.initializePhraseComments();

    await this.props.fetchPreviousPhraseComments(phraseId);

    if (this.props.phraseComments.length > 0) {
      this.firstFetchCommentId = this.props.phraseComments[0].id;
    }
  }

  async onSendComment(messages: IMessage[]) {
    Keyboard.dismiss();

    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("コメントをする", this.props.navigation);
      return;
    }

    const { phrase, submitComment, fetchFollowingPhraseComments, phraseComments } = this.props;
    if (!phrase) {
      return;
    }
    await submitComment(phrase.id, messages[0].text.trim());

    if (phraseComments.length > 0) {
      fetchFollowingPhraseComments(phrase.id, phraseComments[0].id);
      return;
    }

    await this.props.fetchPreviousPhraseComments(phrase.id);

    if (this.props.phraseComments.length > 0 && !this.firstFetchCommentId) {
      this.firstFetchCommentId = this.props.phraseComments[0].id;
    }
  }

  async likeActivate() {
    const { auth, phrase, likePhrase } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("いいねをする", this.props.navigation);
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
    const { auth, phrase, unlikePhrase } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("いいねをする", this.props.navigation);
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
    const { auth, phrase, favoritePhrase } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("お気に入り登録", this.props.navigation);
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
    const { auth, phrase, unfavoritePhrase } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("お気に入り登録", this.props.navigation);
      return;
    }

    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    await unfavoritePhrase(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  messages() {
    return this.props.phraseComments.map(comment => {
      const createdAt = Platform.OS === "ios" ? replaceDateStringForIOS(comment.createdAt) : comment.createdAt;

      return {
        _id: comment.id,
        text: comment.content,
        createdAt: new Date(createdAt),
        user: {
          _id: comment.userId,
          name: comment.username,
          avatar: comment.userImageUrl || require("../../../../assets/images/no-avatar.png")
        }
      };
    });
  }

  render() {
    const { phrase } = this.props;
    const { currentUser } = this.props.auth; // JWTが出力されるとセキュリティ的にまずいので注意

    if (phrase === undefined) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.itemCategoryArea}>
            <InlineCategoryNames categoryName={phrase.categoryName} subcategoryName={phrase.subcategoryName} />
            <ReportIcon reportSymbol="Phrase" reportId={phrase.id} />
          </View>
          <StandardText text={phrase.content} fontSize={16} textStyle={{ marginVertical: 13 }} />
          <StandardText text={phrase.authorName} fontSize={14} />
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
        </View>
        <Chat
          onSend={this.onSendComment}
          messages={this.messages()}
          userId={currentUser ? currentUser.id : undefined}
          reportSymbol="PhraseComment"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  item: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15
  },
  itemCategoryArea: {
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

const mapStateToProps = (state: RootState) => ({
  phrase: state.phrases.phrase,
  auth: state.auth,
  phraseComments: state.phraseComment.phraseComments
});

const mapDispatchToProps = {
  fetchPhraseById: PhrasesAction.fetchPhraseById,
  submitComment: PhraseCommentAction.submitComment,
  fetchPreviousPhraseComments: PhraseCommentAction.fetchPreviousPhraseComments,
  fetchFollowingPhraseComments: PhraseCommentAction.fetchFollowingPhraseComments,
  likePhrase: PhrasesAction.likePhrase,
  unlikePhrase: PhrasesAction.unlikePhrase,
  favoritePhrase: PhrasesAction.favoritePhrase,
  unfavoritePhrase: PhrasesAction.unfavoritePhrase,
  initializePhraseComments: PhraseCommentAction.initializePhraseComments,
  initializePhrase: PhrasesAction.initializePhrase
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Detail);
