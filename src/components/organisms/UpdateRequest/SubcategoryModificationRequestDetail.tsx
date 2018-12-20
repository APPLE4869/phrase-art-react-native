import moment from "moment";
import * as React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as DecisionAction from "../../../actions/UpdateRequest/decision";
import * as SubcategoryModificationRequestAction from "../../../actions/UpdateRequest/subcategoryModificationRequest";
import SubcategoryModificationRequestDTO from "../../../models/dto/UpdateRequest/SubcategoryModificationRequestDTO";
import UpdateRequestDecisionDTO from "../../../models/dto/UpdateRequest/UpdateRequestDecisionDTO";
import UpdateRequestDTO from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import ChoiceButtonGroup from "../../atoms/ChoiceButtonGroup";
import DecisionCounts from "../../atoms/DecisionCounts";
import IconImageWithLabel from "../../atoms/IconImageWithLabel";
import StandardText from "../../atoms/StandardText";
import FinalResult from "../../atoms/UpdateRequest/FinalResult";
import RemainingTime from "../../atoms/UpdateRequest/RemainingTime";
import ReportIcon from "../../molecules/ReportIcon";

interface Props {
  updateRequestId: string;
  subcategoryModificationRequest?: SubcategoryModificationRequestDTO;
  updateRequestDecision?: UpdateRequestDecisionDTO;
  fetchById: any;
  approve: any;
  reject: any;
  auth: any;
  initializeSubcategoryModificationRequest: any;
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
    const { updateRequestId, fetchById, initializeSubcategoryModificationRequest, initializeDecision } = this.props;

    initializeSubcategoryModificationRequest();
    initializeDecision();
    await fetchById(updateRequestId);

    const { updateRequestDecision } = this.props;
    if (updateRequestDecision) {
      this.setState({ choiceButtonGroupActiveIndex: updateRequestDecision.result === "approve" ? 0 : 1 });
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
    const { subcategoryModificationRequest } = this.props;
    if (!subcategoryModificationRequest) {
      return true;
    }
    const { decisionExpiresAt } = subcategoryModificationRequest;

    const decisionExpiresAtMoment = moment(decisionExpiresAt);
    const currentMoment = moment();
    return decisionExpiresAtMoment.diff(currentMoment, "minutes") < 0;
  }

  render() {
    const { subcategoryModificationRequest: request } = this.props;
    const { choiceButtonGroupActiveIndex } = this.state;

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
        <ScrollView style={{ maxHeight: 160, marginBottom: 12 }}>
          <StandardText text="カテゴリー" fontSize={13} textStyle={{ color: colors.grayLevel2, marginTop: 5 }} />
          <StandardText text={request.currentCategoryName} fontSize={14} textStyle={{ marginTop: 15 }} />

          <StandardText text="サブカテゴリー" fontSize={13} textStyle={{ color: colors.grayLevel2, marginTop: 5 }} />
          <StandardText text={request.requestedSubcategoryName} fontSize={15} textStyle={{ marginTop: 15 }} />

          <StandardText text="紹介文" fontSize={13} textStyle={{ color: colors.grayLevel2, marginTop: 5 }} />
          <StandardText text={request.requestedSubcategoryIntroduction || "未登録"} fontSize={15} />
        </ScrollView>
        <View style={styles.itemBottom}>
          <IconImageWithLabel type={UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE} />
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
  subcategoryModificationRequest: state.subcategoryModificationRequest.subcategoryModificationRequest,
  updateRequestDecision: state.subcategoryModificationRequest.updateRequestDecision,
  auth: state.auth
});

const mapDispatchToProps = {
  fetchById: SubcategoryModificationRequestAction.fetchById,
  initializeSubcategoryModificationRequest:
    SubcategoryModificationRequestAction.initializeSubcategoryModificationRequest,
  initializeDecision: SubcategoryModificationRequestAction.initializeDecision,
  approve: DecisionAction.approve,
  reject: DecisionAction.reject
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(RegistrationRequestDetail);
