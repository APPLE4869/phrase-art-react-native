import * as React from "react";
import { ActionSheetIOS, Alert, Platform, StyleSheet, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as QuickbloxAction from "../../../actions/quickblox";
import { State as RootState } from "../../../reducers";
import ConfigureIndexItem from "../../molecules/ConfigureIndexItem";

interface Props {
  navigation: NavigationParams;
  auth: any;
  logout: any;
  addMessage: any;
}

interface State {}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleLogoutDialog = this.handleLogoutDialog.bind(this);
    this.navigateEditProfileImage = this.navigateEditProfileImage.bind(this);
    this.navigateLogin = this.navigateLogin.bind(this);
    this.navigateSignup = this.navigateSignup.bind(this);
    this.navigateTermsOfService = this.navigateTermsOfService.bind(this);
  }

  handleLogoutDialog() {
    const { logout, addMessage } = this.props;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["キャンセル", "ログアウト"],
          title: "ログアウトしますか？",
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            logout();
            addMessage("ログアウトに成功しました。");
          }
        }
      );
    } else {
      Alert.alert(
        "ログアウトしますか？",
        "",
        [
          { text: "キャンセル", style: "cancel" },
          {
            text: "ログアウト",
            onPress: () => {
              logout();
              addMessage("ログアウトに成功しました。");
            }
          }
        ],
        { cancelable: true }
      );
    }
  }

  navigateEditProfileImage() {
    this.props.navigation.navigate("EditProfileImage");
  }

  navigateLogin() {
    this.props.navigation.navigate("ConfigureLogin");
  }

  navigateSignup() {
    this.props.navigation.navigate("ConfigureSignup");
  }

  navigateTermsOfService() {
    this.props.navigation.navigate("ConfigureTermsOfService");
  }

  render() {
    const { auth } = this.props;

    // ログイン中
    if (auth && auth.jwt) {
      return (
        <View style={styles.container}>
          <ConfigureIndexItem title="プロフィール画像" onPress={this.navigateEditProfileImage} />
          <ConfigureIndexItem title="利用規約" onPress={this.navigateTermsOfService} />
          <ConfigureIndexItem title="ログアウト" onPress={this.handleLogoutDialog} hiddenRightArrow={true} />
        </View>
      );
    }

    // 未ログイン
    return (
      <View style={styles.container}>
        <ConfigureIndexItem title="ログイン" onPress={this.navigateLogin} />
        <ConfigureIndexItem title="アカウント作成" onPress={this.navigateSignup} />
        <ConfigureIndexItem title="利用規約" onPress={this.navigateTermsOfService} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout: authAction.logout,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Index);
