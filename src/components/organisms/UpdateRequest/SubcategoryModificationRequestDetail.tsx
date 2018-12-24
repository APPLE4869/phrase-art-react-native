import moment from "moment";
import * as React from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as SubcategoryModificationRequestAction from "../../../actions/UpdateRequest/subcategoryModificationRequest";
import * as UpdateRequestCommentAction from "../../../actions/UpdateRequest/updateRequestComment";
import * as VideoOnDemandsAction from "../../../actions/videoOnDemands";
import SubcategoryModificationRequestDTO from "../../../models/dto/UpdateRequest/SubcategoryModificationRequestDTO";
import UpdateRequestCommentDTO from "../../../models/dto/UpdateRequest/UpdateRequestCommentDTO";
import UpdateRequestDecisionDTO from "../../../models/dto/UpdateRequest/UpdateRequestDecisionDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import { signinRequestAlert } from "../../../support/alert";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import DefaultModal from "../../atoms/DefaultModal";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import StandardText from "../../atoms/StandardText";
import FinalResult from "../../atoms/UpdateRequest/FinalResult";
import RemainingTime from "../../atoms/UpdateRequest/RemainingTime";
import VerticalSlideToggleButton from "../../atoms/VerticalSlideToggleButton";
import Chat from "../../molecules/Chat";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  navigation: NavigationParams;
  updateRequestId: string;
  subcategoryModificationRequest?: SubcategoryModificationRequestDTO;
  updateRequestDecision?: UpdateRequestDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  updateRequestComments: UpdateRequestCommentDTO[];
  initializeSubcategoryModificationRequest: any;
  initializeDecision: any;
  videoOnDemands: VideoOnDemandDTO[];
  fetchVideoOnDemands: any;
  submitComment: any;
  fetchPreviousUpdateRequestComments: any;
  fetchFollowingUpdateRequestComments: any;
  initializeUpdateRequestComments: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
  imageHeight: number;
  imageHeightForModal: number;
  isVisibleModal: boolean;
  itemAnimationMaxHeight: any;
  isShowItem: boolean;
}

class RegistrationRequestDetail extends React.Component<Props, State> {
  private firstFetchCommentId: string = "";
  private itemDefaultMaxHeight: number;
  private keyboardDidShowListener: any;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.itemDefaultMaxHeight = windowSize.height;

    this.state = {
      choiceButtonGroupActiveIndex: undefined,
      imageHeight: 0,
      imageHeightForModal: 0,
      isVisibleModal: false,
      itemAnimationMaxHeight: new Animated.Value(this.itemDefaultMaxHeight),
      isShowItem: true
    };

    this.onSendComment = this.onSendComment.bind(this);
    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);
    this.onImageLayout = this.onImageLayout.bind(this);
    this.onImageLayoutForModal = this.onImageLayoutForModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.slideUpItem = this.slideUpItem.bind(this);
    this.slideDownItem = this.slideDownItem.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);

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
    const {
      updateRequestId,
      fetchVideoOnDemands,
      fetchById,
      initializeSubcategoryModificationRequest,
      initializeDecision
    } = this.props;

    initializeSubcategoryModificationRequest();
    initializeDecision();

    fetchVideoOnDemands();
    await fetchById(updateRequestId);

    const { updateRequestDecision } = this.props;
    if (updateRequestDecision) {
      this.setState({ choiceButtonGroupActiveIndex: updateRequestDecision.result === "approve" ? 0 : 1 });
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
      subcategoryModificationRequest,
      submitComment,
      fetchFollowingUpdateRequestComments,
      updateRequestComments
    } = this.props;
    if (!subcategoryModificationRequest) {
      return;
    }
    await submitComment(subcategoryModificationRequest.id, messages[0].text.trim());

    if (updateRequestComments.length > 0) {
      fetchFollowingUpdateRequestComments(subcategoryModificationRequest.id, updateRequestComments[0].id);
      return;
    }

    await this.props.fetchPreviousUpdateRequestComments(subcategoryModificationRequest.id);

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

  openModal() {
    this.setState({ isVisibleModal: true });
  }

  closeModal() {
    this.setState({ isVisibleModal: false });
  }

  scrollViewMaxHeight() {
    const windowSize = Dimensions.get("window");
    return windowSize.height * 0.35;
  }

  videoOnDemandBlock(videoOnDemand: VideoOnDemandDTO, requestedVideoOnDemandNameKeys?: string[]) {
    const { subcategoryModificationRequest } = this.props;

    if (!subcategoryModificationRequest) {
      return;
    }

    const isActive = requestedVideoOnDemandNameKeys
      ? requestedVideoOnDemandNameKeys.includes(videoOnDemand.nameKey)
      : false;

    return (
      <View style={{ width: "50%", alignItems: "center" }}>
        <Image
          style={{ width: 95, height: 95, opacity: isActive ? 1 : 0.7 }}
          source={{
            uri: videoOnDemand.imageUrl
          }}
        />
        {isActive ? (
          <StandardText text="対応" fontSize={14} textStyle={{ marginTop: 10 }} />
        ) : (
          <StandardText text="未対応" fontSize={14} textStyle={{ color: colors.grayLevel2, marginTop: 10 }} />
        )}
      </View>
    );
  }

  isExpired(): boolean {
    const { subcategoryModificationRequest } = this.props;
    if (!subcategoryModificationRequest) {
      return true;
    }
    const { decisionExpiresAt } = subcategoryModificationRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
  }

  onImageLayout(e: any) {
    this.setState({ imageHeight: e.nativeEvent.layout.width * 0.4 });
  }

  onImageLayoutForModal(e: any) {
    this.setState({ imageHeightForModal: e.nativeEvent.layout.width * 0.4 });
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

  scrollViewContent() {
    const { subcategoryModificationRequest: request, videoOnDemands } = this.props;
    const { imageHeight } = this.state;

    if (!request) {
      return null;
    }

    return (
      <ScrollView style={{ maxHeight: this.scrollViewMaxHeight(), marginBottom: 12 }}>
        <StandardText text="カテゴリー" fontSize={13} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
        <StandardText text={request.currentCategoryName} fontSize={14} textStyle={{ marginBottom: 15 }} />

        <StandardText text="サブカテゴリー" fontSize={13} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
        <StandardText text={request.requestedSubcategoryName} fontSize={15} textStyle={{ marginBottom: 15 }} />

        <StandardText text="紹介文" fontSize={13} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
        <StandardText
          text={request.requestedSubcategoryIntroduction || "未登録"}
          fontSize={15}
          textStyle={{ marginBottom: 15 }}
        />

        <StandardText
          text="この作品が観れる動画配信サービス"
          fontSize={13}
          textStyle={{ color: colors.grayLevel2, marginBottom: 5 }}
        />
        <View style={styles.videoOnDemandContainer}>
          {videoOnDemands.map(videoOnDemand =>
            this.videoOnDemandBlock(videoOnDemand, request.requestedVideoOnDemandNameKeys)
          )}
        </View>

        <StandardText text="イメージ画像" fontSize={13} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
        {request.requestedSubcategoryImageUrl ? (
          <Image
            style={{ width: "100%", height: imageHeight }}
            source={{ uri: request.requestedSubcategoryImageUrl }}
            onLayout={this.onImageLayout}
          />
        ) : (
          <Text>未登録</Text>
        )}
      </ScrollView>
    );
  }

  modificationContentModal() {
    const { subcategoryModificationRequest: request, videoOnDemands } = this.props;
    const { imageHeightForModal, isVisibleModal } = this.state;

    if (!request) {
      return null;
    }

    return (
      <DefaultModal isVisible={isVisibleModal} height={450} closeAction={this.closeModal}>
        <View style={{ width: "100%", flex: 1 }}>
          <View style={{ marginBottom: 30 }}>
            <StandardText
              text="サブカテゴリー"
              fontSize={13}
              textStyle={{ color: colors.grayLevel1, marginBottom: 4 }}
            />
            <StandardText text="修正前" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <StandardText
              text={request.currentCategoryName}
              fontSize={13}
              textStyle={{ marginBottom: 15, paddingLeft: 10 }}
            />
            <StandardText text="修正後" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <StandardText text={request.requestedSubcategoryName} fontSize={13} textStyle={{ paddingLeft: 10 }} />
          </View>

          <View style={{ marginBottom: 30 }}>
            <StandardText text="紹介文" fontSize={13} textStyle={{ color: colors.grayLevel1, marginBottom: 4 }} />
            <StandardText text="修正前" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <StandardText
              text={request.currentSubcategoryIntroduction || "未登録"}
              fontSize={13}
              textStyle={{ marginBottom: 15, paddingLeft: 10 }}
            />
            <StandardText text="修正後" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <StandardText
              text={request.requestedSubcategoryIntroduction || "未登録"}
              fontSize={13}
              textStyle={{ paddingLeft: 10 }}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <StandardText
              text="この作品が観れる動画配信サービス"
              fontSize={13}
              textStyle={{ color: colors.grayLevel1, marginBottom: 4 }}
            />
            <StandardText text="修正前" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <View style={styles.videoOnDemandContainer}>
              {videoOnDemands.map(videoOnDemand =>
                this.videoOnDemandBlock(videoOnDemand, request.currentVideoOnDemandNameKeys)
              )}
            </View>
            <StandardText text="修正後" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <View style={styles.videoOnDemandContainer}>
              {videoOnDemands.map(videoOnDemand =>
                this.videoOnDemandBlock(videoOnDemand, request.requestedVideoOnDemandNameKeys)
              )}
            </View>
          </View>

          <View style={{ width: "100%" }} onLayout={this.onImageLayoutForModal}>
            <StandardText text="イメージ画像" fontSize={13} textStyle={{ color: colors.grayLevel1, marginBottom: 4 }} />
            <StandardText text="修正前" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            {request.currentSubcategoryImageUrl ? (
              <Image
                style={{ width: "100%", height: imageHeightForModal }}
                source={{ uri: request.currentSubcategoryImageUrl }}
              />
            ) : (
              <Text style={{ marginBottom: 15 }}>未登録</Text>
            )}
            <StandardText text="修正後" fontSize={12} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            {request.requestedSubcategoryImageUrl ? (
              <Image
                style={{ width: "100%", height: imageHeightForModal }}
                source={{ uri: request.requestedSubcategoryImageUrl }}
              />
            ) : (
              <Text>未登録</Text>
            )}
          </View>
        </View>
      </DefaultModal>
    );
  }

  render() {
    const { subcategoryModificationRequest: request, auth, updateRequestComments } = this.props;
    const { currentUser } = auth;
    const { choiceButtonGroupActiveIndex, isShowItem, itemAnimationMaxHeight } = this.state;

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

            {this.scrollViewContent()}

            <View style={styles.itemBottom}>
              <IconImageWithLabel type={UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE} />
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
        {this.modificationContentModal()}
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
  },
  videoOnDemandContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 15
  }
});

const mapStateToProps = (state: RootState) => ({
  subcategoryModificationRequest: state.subcategoryModificationRequest.subcategoryModificationRequest,
  updateRequestDecision: state.subcategoryModificationRequest.updateRequestDecision,
  auth: state.auth,
  videoOnDemands: state.videoOnDemands.videoOnDemands,
  updateRequestComments: state.updateRequestComment.updateRequestComments
});

const mapDispatchToProps = {
  fetchById: SubcategoryModificationRequestAction.fetchById,
  initializeSubcategoryModificationRequest:
    SubcategoryModificationRequestAction.initializeSubcategoryModificationRequest,
  initializeDecision: SubcategoryModificationRequestAction.initializeDecision,
  fetchVideoOnDemands: VideoOnDemandsAction.fetchVideoOnDemands,
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

export default enhancer(RegistrationRequestDetail);
