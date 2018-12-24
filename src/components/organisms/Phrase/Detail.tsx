import * as React from "react";
import { Animated, Dimensions, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhraseCommentAction from "../../../actions/Phrase/phraseComment";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseCommentDTO from "../../../models/dto/Phrase/PhraseCommentDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import { signinRequestAlert } from "../../../support/alert";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import StandardText from "../../atoms/StandardText";
import VerticalSlideToggleButton from "../../atoms/VerticalSlideToggleButton";
import Chat from "../../molecules/Chat";
import PhraseBottomActions from "../../molecules/PhraseBottomActions";
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
  initializePhraseComments: any;
  initializePhrase: any;
}

interface State {
  isInProgressLikeAction: boolean;
  isInProgressFavoriteAction: boolean;
  isScrollViewAtContent: boolean;
  itemAnimationMaxHeight: any;
  isShowItem: boolean;
}

class Detail extends React.Component<Props, State> {
  private firstFetchCommentId: string = "";
  private contentHeightThreshold: number;
  private itemDefaultMaxHeight: number;
  private keyboardDidShowListener: any;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.45;
    this.itemDefaultMaxHeight = windowSize.height;

    this.state = {
      isInProgressLikeAction: false,
      isInProgressFavoriteAction: false,
      isScrollViewAtContent: false,
      itemAnimationMaxHeight: new Animated.Value(this.itemDefaultMaxHeight),
      isShowItem: true
    };

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.initializePhrase();
    this.props.fetchPhraseById(phraseId);

    this.onSendComment = this.onSendComment.bind(this);
    this.onLayoutOfContent = this.onLayoutOfContent.bind(this);
    this.slideUpItem = this.slideUpItem.bind(this);
    this.slideDownItem = this.slideDownItem.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);

    this.initializeComments(phraseId);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  keyboardDidShow() {
    this.slideUpItem();
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

  onLayoutOfContent(e: any) {
    if (this.contentHeightThreshold < e.nativeEvent.layout.height) {
      this.setState({ isScrollViewAtContent: true });
    }
  }

  slideUpItem() {
    Animated.spring(this.state.itemAnimationMaxHeight, {
      toValue: 0,
      friction: 10,
      velocity: 1.5
    }).start();
    this.setState({ isShowItem: false });
  }

  slideDownItem() {
    Animated.spring(this.state.itemAnimationMaxHeight, {
      toValue: this.itemDefaultMaxHeight,
      friction: 10,
      velocity: 1.5
    }).start();
    this.setState({ isShowItem: true });

    Keyboard.dismiss();
  }

  render() {
    const { phrase, navigation, phraseComments } = this.props;
    const { currentUser } = this.props.auth; // JWTが出力されるとセキュリティ的にまずいので注意
    const { isShowItem, itemAnimationMaxHeight, isScrollViewAtContent } = this.state;

    if (phrase === undefined) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Animated.View style={{ maxHeight: itemAnimationMaxHeight, overflow: "hidden" }}>
            <View style={styles.itemCategoryArea}>
              <InlineCategoryNames categoryName={phrase.categoryName} subcategoryName={phrase.subcategoryName} />
              <ReportIcon reportSymbol="Phrase" reportId={phrase.id} />
            </View>
            {isScrollViewAtContent ? (
              <ScrollView style={{ width: "100%", height: this.contentHeightThreshold, marginVertical: 13 }}>
                <StandardText text={phrase.content} fontSize={16} />
              </ScrollView>
            ) : (
              <StandardText
                text={phrase.content}
                fontSize={16}
                textStyle={{ marginVertical: 13 }}
                onLayout={this.onLayoutOfContent}
              />
            )}
            <StandardText text={phrase.authorName} fontSize={14} />
            <PhraseBottomActions navigation={navigation} phrase={phrase} />
            <View style={{ height: 25 }} />
          </Animated.View>
          <VerticalSlideToggleButton
            isShowItem={isShowItem}
            onSlideUp={this.slideUpItem}
            onSlideDown={this.slideDownItem}
          />
        </View>
        <Chat
          onSend={this.onSendComment}
          comments={phraseComments}
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
    position: "absolute",
    width: "100%",
    zIndex: 10,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: colors.grayLevel4,
    borderWidth: 1
  },
  itemCategoryArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10
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
  initializePhraseComments: PhraseCommentAction.initializePhraseComments,
  initializePhrase: PhrasesAction.initializePhrase
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Detail);
