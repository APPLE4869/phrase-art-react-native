import moment from "moment";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as PhraseDeletionRequestAction from "../../../actions/UpdateRequest/phraseDeletionRequest";
import PhraseDecisionDTO from "../../../models/dto/UpdateRequest/PhraseDecisionDTO";
import PhraseDeletionRequestDTO from "../../../models/dto/UpdateRequest/PhraseDeletionRequestDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import InlineCategoryNames from "../../atoms/InlineCategoryNames";
import RemainingTime from "../../atoms/RemainingTime";
import StandardText from "../../atoms/StandardText";

interface Props {
  updateRequestId: string;
  phraseDeletionRequest?: PhraseDeletionRequestDTO;
  phraseDecision?: PhraseDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
}

interface State {
  choiceButtonGroupActiveIndex?: 0 | 1;
}

class DeletionRequestDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { choiceButtonGroupActiveIndex: undefined };

    this.onPressForPositive = this.onPressForPositive.bind(this);
    this.onPressForNegative = this.onPressForNegative.bind(this);

    this.initialize();
  }

  async initialize() {
    const { updateRequestId, fetchById } = this.props;

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
    const { phraseDeletionRequest } = this.props;
    if (!phraseDeletionRequest) {
      return true;
    }
    const { decisionExpiresAt } = phraseDeletionRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
  }

  render() {
    const { phraseDeletionRequest: request } = this.props;
    const { choiceButtonGroupActiveIndex } = this.state;

    if (!request) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.itemTop}>
          <InlineCategoryNames categoryName={request.categoryName} subcategoryName={request.subcategoryName} />
          <RemainingTime decisionExpiresAt={request.decisionExpiresAt} />
        </View>
        <StandardText text={request.phraseContent} fontSize={13} textStyle={{ marginVertical: 10 }} />
        <StandardText text={request.phraseAuthorName} fontSize={12} textStyle={{ color: colors.grayLevel1 }} />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 30
  },
  itemTop: {
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
  auth: state.auth
});

const mapDispatchToProps = {
  fetchById: PhraseDeletionRequestAction.fetchById,
  approve: DecisionAction.approve,
  reject: DecisionAction.reject
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(DeletionRequestDetail);
