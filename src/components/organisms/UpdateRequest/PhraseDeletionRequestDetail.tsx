import moment from "moment";
import * as React from "react";
import { Animated, Dimensions, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as PhraseDeletionRequestAction from "../../../actions/UpdateRequest/phraseDeletionRequest";
import * as UpdateRequestCommentAction from "../../../actions/UpdateRequest/updateRequestComment";
import PhraseDecisionDTO from "../../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseDeletionRequestDTO from "../../../models/dto/UpdateRequest/PhraseDeletionRequestDTO";
import UpdateRequestCommentDTO from "../../../models/dto/UpdateRequest/UpdateRequestCommentDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import { signinRequestAlert } from "../../../support/alert";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
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
  phraseDeletionRequest?: PhraseDeletionRequestDTO;
  phraseDecision?: PhraseDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  updateRequestComments: UpdateRequestCommentDTO[];
  initializePhraseDeletionRequest: any;
  initializeDecision: any;
  submitComment: any;
  fetchPreviousUpdateRequestComments: any;
  fetchFollowingUpdateRequestComments: any;
  initializeUpdateRequestComments: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
  isScrollViewAtContent: boolean;
  itemAnimationMaxHeight: any;
  isShowItem: boolean;
}

class DeletionRequestDetail extends React.Component<Props, State> {
  private firstFetchCommentId: string = "";
  private contentHeightThreshold: number;
  private itemDefaultMaxHeight: number;
  private keyboardDidShowListener: any;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.35;
    this.itemDefaultMaxHeight = windowSize.height;

    this.state = {
      choiceButtonGroupActiveIndex: undefined,
      isScrollViewAtContent: false,
      itemAnimationMaxHeight: new Animated.Value(this.itemDefaultMaxHeight),
      isShowItem: true
    };

    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);
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
    const { updateRequestId, fetchById, initializePhraseDeletionRequest, initializeDecision } = this.props;

    initializePhraseDeletionRequest();
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
      phraseDeletionRequest,
      submitComment,
      fetchFollowingUpdateRequestComments,
      updateRequestComments
    } = this.props;
    if (!phraseDeletionRequest) {
      return;
    }
    await submitComment(phraseDeletionRequest.id, messages[0].text.trim());

    if (updateRequestComments.length > 0) {
      fetchFollowingUpdateRequestComments(phraseDeletionRequest.id, updateRequestComments[0].id);
      return;
    }

    await this.props.fetchPreviousUpdateRequestComments(phraseDeletionRequest.id);

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
      signinRequestAlert("承認または否認をする", this.props.navigation);
      return false;
    }
    return true;
  }

  isExpired(): boolean {
    const { phraseDeletionRequest } = this.props;
    if (!phraseDeletionRequest) {
      return true;
    }
    const { decisionExpiresAt } = phraseDeletionRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
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
    const { phraseDeletionRequest: request, auth, updateRequestComments } = this.props;
    const { currentUser } = auth;
    const { choiceButtonGroupActiveIndex, isScrollViewAtContent, isShowItem, itemAnimationMaxHeight } = this.state;

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
            <InlineCategoryNames categoryName={request.categoryName} subcategoryName={request.subcategoryName} />
            {isScrollViewAtContent ? (
              <ScrollView style={{ width: "100%", height: this.contentHeightThreshold, marginVertical: 10 }}>
                <StandardText text={request.phraseContent} fontSize={15} />
              </ScrollView>
            ) : (
              <StandardText
                text={request.phraseContent}
                fontSize={15}
                textStyle={{ marginVertical: 10 }}
                onLayout={this.onLayoutOfContent}
              />
            )}
            <StandardText text={request.phraseAuthorName} fontSize={13} textStyle={{ color: colors.grayLevel1 }} />
            <View style={styles.itemBottom}>
              <IconImageWithLabel type={UpdateRequestDTO.PHRASE_DELETION_REQUEST_TYPE} />
              <DecisionCounts approvedCount={request.approvedCount} rejectedCount={request.rejectedCount} />
            </View>
            <ChoiceButtonGroup
              positiveTitle="承認する"
              negativeTitle="否認する"
              onPressForPositive={this.onPressForPositive}
              onPressForNegative={this.onPressForNegative}
              activeIndex={choiceButtonGroupActiveIndex}
              marginTop={20}
              isDisabled={this.isExpired()}
            />
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
          comments={updateRequestComments}
          userId={currentUser ? currentUser.id : undefined}
          reportSymbol="UpdateRequestComment"
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
  phraseDeletionRequest: state.phraseDeletionRequest.phraseDeletionRequest,
  phraseDecision: state.phraseDeletionRequest.phraseDecision,
  auth: state.auth,
  updateRequestComments: state.updateRequestComment.updateRequestComments
});

const mapDispatchToProps = {
  fetchById: PhraseDeletionRequestAction.fetchById,
  initializePhraseDeletionRequest: PhraseDeletionRequestAction.initializePhraseDeletionRequest,
  initializeDecision: PhraseDeletionRequestAction.initializeDecision,
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

export default enhancer(DeletionRequestDetail);
