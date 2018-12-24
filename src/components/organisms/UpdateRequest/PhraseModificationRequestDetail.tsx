import moment from "moment";
import * as React from "react";
import { Alert, Animated, Dimensions, Keyboard, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as PhraseModificationRequestAction from "../../../actions/UpdateRequest/phraseModificationRequest";
import * as UpdateRequestCommentAction from "../../../actions/UpdateRequest/updateRequestComment";
import PhraseDecisionDTO from "../../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseModificationRequestDTO from "../../../models/dto/UpdateRequest/PhraseModificationRequestDTO";
import UpdateRequestCommentDTO from "../../../models/dto/UpdateRequest/UpdateRequestCommentDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import { signinRequestAlert } from "../../../support/alert";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import DefaultModal from "../../atoms/DefaultModal";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import StandardText from "../../atoms/StandardText";
import FinalResult from "../../atoms/UpdateRequest/FinalResult";
import RemainingTime from "../../atoms/UpdateRequest/RemainingTime";
import VerticalSlideToggleButton from "../../atoms/VerticalSlideToggleButton";
import Chat from "../../molecules/Chat";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  navigation: NavigationParams;
  updateRequestId: string;
  phraseModificationRequest?: PhraseModificationRequestDTO;
  phraseDecision?: PhraseDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  initializePhraseModificationRequest: any;
  initializeDecision: any;
  updateRequestComments: UpdateRequestCommentDTO[];
  submitComment: any;
  fetchPreviousUpdateRequestComments: any;
  fetchFollowingUpdateRequestComments: any;
  initializeUpdateRequestComments: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
  isVisibleModal: boolean;
  isScrollViewAtContent: boolean;
  itemAnimationMaxHeight: any;
  isShowItem: boolean;
}

class ModificationRequestDetail extends React.Component<Props, State> {
  private firstFetchCommentId: string = "";
  private contentHeightThreshold: number;
  private itemDefaultMaxHeight: number;
  private keyboardDidShowListener: any;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.32;
    this.itemDefaultMaxHeight = windowSize.height;

    this.state = {
      choiceButtonGroupActiveIndex: undefined,
      isVisibleModal: false,
      isScrollViewAtContent: false,
      itemAnimationMaxHeight: new Animated.Value(this.itemDefaultMaxHeight),
      isShowItem: true
    };

    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onLayoutOfContent = this.onLayoutOfContent.bind(this);
    this.slideUpItem = this.slideUpItem.bind(this);
    this.slideDownItem = this.slideDownItem.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.onSendComment = this.onSendComment.bind(this);

    this.initialize();
    this.initializeComments();
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

  async initialize() {
    const { updateRequestId, fetchById, initializePhraseModificationRequest, initializeDecision } = this.props;

    initializePhraseModificationRequest();
    initializeDecision();
    await fetchById(updateRequestId);

    const { phraseDecision } = this.props;
    if (phraseDecision) {
      this.setState({ choiceButtonGroupActiveIndex: phraseDecision.result === "approve" ? 0 : 1 });
    }
  }

  async initializeComments() {
    const { updateRequestId, fetchPreviousUpdateRequestComments } = this.props;
    this.props.initializeUpdateRequestComments();

    await fetchPreviousUpdateRequestComments(updateRequestId);

    const { updateRequestComments } = this.props;
    if (updateRequestComments.length > 0) {
      this.firstFetchCommentId = updateRequestComments[0].id;
    }
  }

  async onSendComment(messages: IMessage[]) {
    Keyboard.dismiss();

    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("コメントをする", this.props.navigation);
      return;
    }

    const {
      phraseModificationRequest,
      submitComment,
      fetchFollowingUpdateRequestComments,
      updateRequestComments
    } = this.props;
    if (!phraseModificationRequest) {
      return;
    }
    await submitComment(phraseModificationRequest.id, messages[0].text.trim());

    if (updateRequestComments.length > 0) {
      fetchFollowingUpdateRequestComments(phraseModificationRequest.id, updateRequestComments[0].id);
      return;
    }

    await this.props.fetchPreviousUpdateRequestComments(phraseModificationRequest.id);

    if (this.props.updateRequestComments.length > 0 && !this.firstFetchCommentId) {
      this.firstFetchCommentId = this.props.updateRequestComments[0].id;
    }
  }

  async onPressForPositive() {
    if (!this.isLoggedIn()) {
      return;
    }

    const { updateRequestId, approve, fetchById } = this.props;

    await approve(updateRequestId);

    // 承認数等を更新
    await fetchById(updateRequestId);

    this.setState({ choiceButtonGroupActiveIndex: 0 });
  }

  async onPressForNegative() {
    if (!this.isLoggedIn()) {
      return;
    }

    const { updateRequestId, reject, fetchById } = this.props;

    await reject(updateRequestId);

    // 否認数等を更新
    await fetchById(updateRequestId);

    this.setState({ choiceButtonGroupActiveIndex: 1 });
  }

  isLoggedIn() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "承認または否認をするには、ログインする必要があります。\n設定からアカウントを作成してください。\n（作成は２０秒でできます。）"
      );
      return false;
    }
    return true;
  }

  isExpired(): boolean {
    const { phraseModificationRequest } = this.props;
    if (!phraseModificationRequest) {
      return true;
    }
    const { decisionExpiresAt } = phraseModificationRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
  }

  openModal() {
    this.setState({ isVisibleModal: true });
  }

  closeModal() {
    this.setState({ isVisibleModal: false });
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
    const { phraseModificationRequest: request, auth, updateRequestComments } = this.props;
    const { currentUser } = auth;
    const {
      choiceButtonGroupActiveIndex,
      isVisibleModal,
      isShowItem,
      isScrollViewAtContent,
      itemAnimationMaxHeight
    } = this.state;

    if (!request) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Animated.View style={{ maxHeight: itemAnimationMaxHeight, overflow: "hidden" }}>
            <View style={styles.itemTop}>
              {request.finalDecisionResult ? (
                <FinalResult
                  decisionExpiresAt={request.decisionExpiresAt}
                  finalDecisionResult={request.finalDecisionResult}
                />
              ) : (
                <RemainingTime decisionExpiresAt={request.decisionExpiresAt} />
              )}
              <ReportIcon reportSymbol="UpdateRequest" reportId={request.id} />
            </View>
            <InlineCategoryNames
              categoryName={request.requestedCategoryName}
              subcategoryName={request.requestedSubcategoryName}
            />
            {isScrollViewAtContent ? (
              <ScrollView style={{ width: "100%", height: this.contentHeightThreshold, marginVertical: 10 }}>
                <StandardText text={request.requestedPhraseContent} fontSize={15} />
              </ScrollView>
            ) : (
              <StandardText
                text={request.requestedPhraseContent}
                fontSize={15}
                textStyle={{ marginVertical: 10 }}
                onLayout={this.onLayoutOfContent}
              />
            )}
            <StandardText
              text={request.requestedPhraseAuthorName}
              fontSize={13}
              textStyle={{ color: colors.grayLevel1 }}
            />
            <View style={styles.itemBottom}>
              <IconImageWithLabel type={UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE} />
              <DecisionCounts approvedCount={request.approvedCount} rejectedCount={request.rejectedCount} />
            </View>
            <TouchableOpacity onPress={this.openModal} style={{ marginTop: 5, alignSelf: "flex-start" }}>
              <StandardText text="修正内容を確認する" fontSize={12} textStyle={{ color: colors.clickable }} />
            </TouchableOpacity>
            <ChoiceButtonGroup
              positiveTitle="承認する"
              negativeTitle="否認する"
              onPressForPositive={this.onPressForPositive}
              onPressForNegative={this.onPressForNegative}
              activeIndex={choiceButtonGroupActiveIndex}
              marginTop={25}
              isDisabled={this.isExpired()}
            />
          </Animated.View>
          <VerticalSlideToggleButton
            isShowItem={isShowItem}
            onSlideUp={this.slideUpItem}
            onSlideDown={this.slideDownItem}
          />
        </View>
        <Chat
          onSend={this.onSendComment}
          comments={updateRequestComments}
          userId={currentUser ? currentUser.id : undefined}
          reportSymbol="UpdateRequestComment"
        />

        <DefaultModal isVisible={isVisibleModal} height={450} closeAction={this.closeModal}>
          <View style={{ width: "100%", flex: 1 }}>
            <StandardText text="修正前" fontSize={15} textStyle={{ fontWeight: "bold", marginBottom: 10 }} />
            <InlineCategoryNames
              categoryName={request.currentCategoryName}
              subcategoryName={request.currentSubcategoryName}
              isSmallFontSize={true}
            />
            <StandardText text={request.currentPhraseContent} fontSize={13} textStyle={{ marginVertical: 5 }} />
            <StandardText
              text={request.currentPhraseAuthorName}
              fontSize={12}
              textStyle={{ color: colors.grayLevel1 }}
            />
            <StandardText
              text="修正後"
              fontSize={15}
              textStyle={{ fontWeight: "bold", marginTop: 30, marginBottom: 10 }}
            />
            <InlineCategoryNames
              categoryName={request.requestedCategoryName}
              subcategoryName={request.requestedSubcategoryName}
              isSmallFontSize={true}
            />
            <StandardText text={request.requestedPhraseContent} fontSize={13} textStyle={{ marginVertical: 5 }} />
            <StandardText
              text={request.requestedPhraseAuthorName}
              fontSize={12}
              textStyle={{ color: colors.grayLevel1 }}
            />
          </View>
        </DefaultModal>
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
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: colors.grayLevel4,
    borderWidth: 1
  },
  itemTop: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  }
});

const mapStateToProps = (state: RootState) => ({
  phraseModificationRequest: state.phraseModificationRequest.phraseModificationRequest,
  phraseDecision: state.phraseModificationRequest.phraseDecision,
  auth: state.auth,
  updateRequestComments: state.updateRequestComment.updateRequestComments
});

const mapDispatchToProps = {
  fetchById: PhraseModificationRequestAction.fetchById,
  initializePhraseModificationRequest: PhraseModificationRequestAction.initializePhraseModificationRequest,
  initializeDecision: PhraseModificationRequestAction.initializeDecision,
  approve: DecisionAction.approve,
  reject: DecisionAction.reject,
  submitComment: UpdateRequestCommentAction.submitComment,
  fetchPreviousUpdateRequestComments: UpdateRequestCommentAction.fetchPreviousUpdateRequestComments,
  fetchFollowingUpdateRequestComments: UpdateRequestCommentAction.fetchFollowingUpdateRequestComments,
  initializeUpdateRequestComments: UpdateRequestCommentAction.initializeUpdateRequestComments
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(ModificationRequestDetail);
