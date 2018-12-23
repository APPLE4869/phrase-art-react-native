import * as React from "react";
import { ActionSheetIOS, Alert, Image, Keyboard, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhraseCommentAction from "../../../actions/Phrase/phraseComment";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseCommentDTO from "../../../models/dto/Phrase/PhraseCommentDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { replaceDateStringForIOS } from "../../../support/replace";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import CommentWithCount from "../../atoms/PhraseItem/CommentWithCount";
import FavoriteWithCount from "../../atoms/PhraseItem/FavoriteWithCount";
import LikeWithCount from "../../atoms/PhraseItem/LikeWithCount";
import StandardText from "../../atoms/StandardText";
import Chat from "../../molecules/Chat";
import ReportIcon from "../../molecules/ReportIcon";
import DefaultTemplate from "../../templates/DefaultTemplate";

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

// TODO : Screenで全てやってしまっているので、Organismsに切り出す。
class PhraseDetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={navigation.getParam("handleEditDialog")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/edit.png")} />
        </TouchableOpacity>
      )
    };
  };
  private firstFetchCommentId: string = "";

  constructor(props: Props) {
    super(props);

    this.state = { isInProgressLikeAction: false, isInProgressFavoriteAction: false };

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.initializePhrase();
    this.props.fetchPhraseById(phraseId);

    this.handleEditDialog = this.handleEditDialog.bind(this);
    this.navigateModificationRequest = this.navigateModificationRequest.bind(this);
    this.navigateDeletionRequest = this.navigateDeletionRequest.bind(this);
    this.onSend = this.onSend.bind(this);
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

  componentDidMount() {
    this.props.navigation.setParams({ handleEditDialog: this.handleEditDialog });
  }

  handleEditDialog() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "名言の修正・削除を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。\n（作成は２０秒でできます。）",
        [{ text: "OK" }]
      );
      return;
    }

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["キャンセル", "修正を申請する", "削除を申請する"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this.navigateModificationRequest();
          } else if (buttonIndex === 2) {
            this.navigateDeletionRequest();
          }
        }
      );
    } else {
      Alert.alert(
        "修正、削除のどちらを申請するか選択してください。",
        undefined,
        [
          { text: "キャンセル", style: "cancel" },
          { text: "修正を申請する", onPress: this.navigateModificationRequest },
          { text: "削除を申請する", onPress: this.navigateDeletionRequest }
        ],
        { cancelable: true }
      );
    }
  }

  navigateModificationRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormModificationRequest", { phrase });
  }

  navigateDeletionRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormDeletionRequest", { phrase });
  }

  async onSend(messages: IMessage[]) {
    Keyboard.dismiss();

    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "コメントをするには、ログインする必要があります。\n設定からアカウントを作成してください。\n（作成は２０秒でできます。）",
        [{ text: "OK" }]
      );
      return;
    }

    const { phrase, submitComment, fetchFollowingPhraseComments, phraseComments } = this.props;
    if (!phrase) {
      return;
    }
    await submitComment(phrase.id, messages[0].text);

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
    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    const { phrase, likePhrase } = this.props;
    await likePhrase(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async likeUnactivate() {
    if (this.state.isInProgressLikeAction) {
      return;
    }

    this.setState({ isInProgressLikeAction: true });

    const { phrase, unlikePhrase } = this.props;
    await unlikePhrase(phrase);

    this.setState({ isInProgressLikeAction: false });
  }

  async favoriteActivate() {
    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    const { phrase, favoritePhrase } = this.props;
    await favoritePhrase(phrase);

    this.setState({ isInProgressFavoriteAction: false });
  }

  async favoriteUnactivate() {
    if (this.state.isInProgressFavoriteAction) {
      return;
    }

    this.setState({ isInProgressFavoriteAction: true });

    const { phrase, unfavoritePhrase } = this.props;
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
      <DefaultTemplate>
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
            onSend={this.onSend}
            messages={this.messages()}
            userId={currentUser ? currentUser.id : undefined}
            reportSymbol="PhraseComment"
          />
        </View>
      </DefaultTemplate>
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

export default enhancer(PhraseDetailScreen);
