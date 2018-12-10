import * as React from "react";
import {
  ActionSheetIOS,
  Alert,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhraseCommentAction from "../../../actions/Phrase/phraseComment";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseCommentDTO from "../../../models/dto/Phrase/PhraseCommentDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import Chat from "../../molecules/Chat";
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
  initializePhraseComments: any;
}

// TODO : Screenで全てやってしまっているので、Organismsに切り出す。
class PhraseDetailScreen extends React.Component<Props> {
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

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.fetchPhraseById(phraseId);

    this.handleEditDialog = this.handleEditDialog.bind(this);
    this.navigateModificationRequest = this.navigateModificationRequest.bind(this);
    this.navigateDeletionRequest = this.navigateDeletionRequest.bind(this);
    this.onSend = this.onSend.bind(this);

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
        "名言の修正・削除を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。",
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
        "コメントをするには、ログインする必要があります。\n設定からアカウントを作成してください。",
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

  messages() {
    return this.props.phraseComments.map(comment => ({
      _id: comment.id,
      text: comment.content,
      createdAt: new Date(comment.createdAt),
      user: {
        _id: comment.userId,
        name: comment.username,
        avatar: comment.userImageUrl || "https://kotobank.jp/image/dictionary/daijisen/media/104886.jpg"
      }
    }));
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
              <Text style={styles.itemCategoryAreaMain}>{phrase.categoryName}</Text>
              <Image
                style={{ width: 8, height: 8 }}
                source={require("../../../../assets/images/icon/angle-right-gray2.png")}
              />
              <Text style={styles.itemCategoryAreaSub}>{phrase.subcategoryName}</Text>
            </View>
            <Text style={styles.itemPhraseContent}>{phrase.content}</Text>
            <Text style={styles.itemAuthorName}>{phrase.authorName}</Text>
          </View>
          <Chat onSend={this.onSend} messages={this.messages()} userId={currentUser ? currentUser.id : undefined} />
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
    paddingHorizontal: 15,
    width: "100%"
  },
  itemCategoryArea: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemCategoryAreaMain: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginRight: 7
  },
  itemCategoryAreaSub: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginLeft: 12
  },
  itemPhraseContent: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.8,
    marginVertical: 13,
    color: colors.baseBlack
  },
  itemAuthorName: {
    fontSize: 13,
    letterSpacing: 1,
    color: colors.baseBlack
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
  initializePhraseComments: PhraseCommentAction.initializePhraseComments
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseDetailScreen);
