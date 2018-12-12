import * as React from "react";
import { ActionSheetIOS, Alert, Image, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as loadingAction from "../../actions/loading";
import * as QuickbloxAction from "../../actions/quickblox";
import * as ReportsAction from "../../actions/reports";
import { State as RootState } from "../../reducers";
import { State as AuthState } from "../../reducers/auth";

interface Props {
  reportSymbol: string;
  reportId: string;
  startLoading: any;
  endLoading: any;
  addMessage: any;
  reportInjustice: any;
  auth: AuthState;
}

class ReportIcon extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.postReport = this.postReport.bind(this);
  }

  onPress() {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["キャンセル", "不正な申請として報告する"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this.postReport();
          }
        }
      );
    } else {
      Alert.alert(
        "不正な申請として報告する",
        "",
        [
          { text: "いいえ", style: "cancel" },
          {
            text: "はい",
            onPress: () => {
              this.postReport();
            }
          }
        ],
        { cancelable: true }
      );
    }
  }

  async postReport() {
    const { startLoading, endLoading, addMessage, reportInjustice, auth, reportSymbol, reportId } = this.props;
    const { currentUser } = auth;
    const userId = currentUser ? currentUser.id : "";

    // 通知処理
    startLoading();

    try {
      await reportInjustice(userId, reportId, reportSymbol);
    } catch (e) {
      endLoading();
      Alert.alert("通信に失敗しました。もう一度お試しください。");
      throw e;
    }

    endLoading();
    addMessage("不正な申請として報告しました。");
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={{ bottom: 3 }}>
        <Image style={{ width: 12, height: 12 }} source={require("../../../assets/images/icon/angle-down-gray2.png")} />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  addMessage: QuickbloxAction.addMessage,
  reportInjustice: ReportsAction.reportInjustice,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(ReportIcon);
