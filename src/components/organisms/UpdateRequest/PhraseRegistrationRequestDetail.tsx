import moment from "moment";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as PhraseRegistrationRequestAction from "../../../actions/UpdateRequest/phraseRegistrationRequest";
import PhraseDecisionDTO from "../../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseRegistrationRequestDTO from "../../../models/dto/UpdateRequest/PhraseRegistrationRequestDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import RemainingTime from "../../atoms/RemainingTime";
import StandardText from "../../atoms/StandardText";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  updateRequestId: string;
  phraseRegistrationRequest?: PhraseRegistrationRequestDTO;
  phraseDecision?: PhraseDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  initializePhraseRegistrationRequest: any;
  initializeDecision: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
}

class RegistrationRequestDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { choiceButtonGroupActiveIndex: undefined };

    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);

    this.initialize();
  }

  async initialize() {
    const { updateRequestId, fetchById, initializePhraseRegistrationRequest, initializeDecision } = this.props;

    initializePhraseRegistrationRequest();
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
        "承認または否認をするには、ログインする必要があります。\n設定からアカウントを作成してください。"
      );
      return false;
    }
    return true;
  }

  isExpired(): boolean {
    const { phraseRegistrationRequest } = this.props;
    if (!phraseRegistrationRequest) {
      return true;
    }
    const { decisionExpiresAt } = phraseRegistrationRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
  }

  render() {
    const { phraseRegistrationRequest: request } = this.props;
    const { choiceButtonGroupActiveIndex } = this.state;

    if (!request) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.itemTop}>
          <RemainingTime decisionExpiresAt={request.decisionExpiresAt} />
          <ReportIcon reportSymbol="UpdateRequest" reportId={request.id} />
        </View>
        <InlineCategoryNames categoryName={request.categoryName} subcategoryName={request.subcategoryName} />
        <StandardText text={request.phraseContent} fontSize={15} textStyle={{ marginVertical: 10 }} />
        <StandardText text={request.phraseAuthorName} fontSize={13} textStyle={{ color: colors.grayLevel1 }} />
        <View style={styles.itemBottom}>
          <IconImageWithLabel type={UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE} />
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
  phraseRegistrationRequest: state.phraseRegistrationRequest.phraseRegistrationRequest,
  phraseDecision: state.phraseRegistrationRequest.phraseDecision,
  auth: state.auth
});

const mapDispatchToProps = {
  fetchById: PhraseRegistrationRequestAction.fetchById,
  initializePhraseRegistrationRequest: PhraseRegistrationRequestAction.initializePhraseRegistrationRequest,
  initializeDecision: PhraseRegistrationRequestAction.initializeDecision,
  approve: DecisionAction.approve,
  reject: DecisionAction.reject
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(RegistrationRequestDetail);
