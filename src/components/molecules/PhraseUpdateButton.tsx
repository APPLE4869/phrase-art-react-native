import * as React from "react";
import { ActionSheetIOS, Alert, Image, Platform, TouchableOpacity } from "react-native";
import { NavigationParams } from "react-navigation";
import { signinRequestAlert } from "../../support/alert";

interface Props {
  auth?: { jwt?: string };
  navigation: NavigationParams;
  navigateModificationRequest: () => void;
  navigateDeletionRequest: () => void;
}

export default class PhraseUpdateButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleEditDialog = this.handleEditDialog.bind(this);
  }

  handleEditDialog() {
    const { auth, navigateModificationRequest, navigateDeletionRequest } = this.props;

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
            navigateModificationRequest();
          } else if (buttonIndex === 2) {
            navigateDeletionRequest();
          }
        }
      );
    } else {
      Alert.alert(
        "修正、削除のどちらを申請するか選択してください。",
        undefined,
        [
          { text: "キャンセル", style: "cancel" },
          { text: "削除を申請する", onPress: navigateDeletionRequest },
          { text: "修正を申請する", onPress: navigateModificationRequest }
        ],
        { cancelable: true }
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.handleEditDialog}
        style={{ marginRight: Platform.OS === "android" ? 15 : 0 }}
      >
        <Image style={{ width: 20, height: 20 }} source={require("../../../assets/images/icon/edit.png")} />
      </TouchableOpacity>
    );
  }
}
