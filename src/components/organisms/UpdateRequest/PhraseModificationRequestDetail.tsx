import moment from "moment";
import * as React from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as PhraseModificationRequestAction from "../../../actions/UpdateRequest/phraseModificationRequest";
import PhraseDecisionDTO from "../../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseModificationRequestDTO from "../../../models/dto/UpdateRequest/PhraseModificationRequestDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import DefaultModal from "../../atoms/DefaultModal";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import StandardText from "../../atoms/StandardText";
import FinalResult from "../../atoms/UpdateRequest/FinalResult";
import RemainingTime from "../../atoms/UpdateRequest/RemainingTime";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  updateRequestId: string;
  phraseModificationRequest?: PhraseModificationRequestDTO;
  phraseDecision?: PhraseDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  initializePhraseModificationRequest: any;
  initializeDecision: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
  isVisibleModal: boolean;
  isScrollViewAtContent: boolean;
}

class ModificationRequestDetail extends React.Component<Props, State> {
  private contentHeightThreshold: number;

  constructor(props: Props) {
    super(props);

    this.state = { choiceButtonGroupActiveIndex: undefined, isVisibleModal: false, isScrollViewAtContent: false };

    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onLayoutOfContent = this.onLayoutOfContent.bind(this);

    const windowSize = Dimensions.get("window");
    this.contentHeightThreshold = windowSize.height * 0.32;

    this.initialize();
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

  render() {
    const { phraseModificationRequest: request } = this.props;
    const { choiceButtonGroupActiveIndex, isVisibleModal, isScrollViewAtContent } = this.state;

    if (!request) {
      return null;
    }

    return (
      <View style={styles.container}>
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
        <StandardText text={request.requestedPhraseAuthorName} fontSize={13} textStyle={{ color: colors.grayLevel1 }} />
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
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 15
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
  auth: state.auth
});

const mapDispatchToProps = {
  fetchById: PhraseModificationRequestAction.fetchById,
  initializePhraseModificationRequest: PhraseModificationRequestAction.initializePhraseModificationRequest,
  initializeDecision: PhraseModificationRequestAction.initializeDecision,
  approve: DecisionAction.approve,
  reject: DecisionAction.reject
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(ModificationRequestDetail);
