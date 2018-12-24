import * as React from "react";
import { ActionSheetIOS, Alert, Image, Platform, TouchableOpacity } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { signinRequestAlert } from "../../../support/alert";
import PhraseDetail from "../../organisms/Phrase/Detail";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO | undefined;
  auth: any;
}

interface State {}

class SearchedDetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={navigation.getParam("handleEditDialog")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/edit.png")} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.handleEditDialog = this.handleEditDialog.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleEditDialog: this.handleEditDialog });
  }

  handleEditDialog() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("名言の修正・削除申請", this.props.navigation);
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

  render() {
    return (
      <DefaultTemplate>
        <PhraseDetail navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  phrase: state.phrases.phrase,
  auth: state.auth
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SearchedDetailScreen);
