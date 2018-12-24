import * as React from "react";
import { ActionSheetIOS, Alert, Image, Platform, StyleSheet, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as currentProfileAction from "../../../actions/currentProfile";
import * as QuickbloxAction from "../../../actions/quickblox";
import CurrentProfileDTO from "../../../models/dto/CurrentProfileDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";
import ConfigureIndexItem from "../../molecules/ConfigureIndexItem";

interface Props {
  navigation: NavigationParams;
  auth: any;
  currentProfile?: CurrentProfileDTO;
  logout: any;
  clearCurrentProfile: any;
  addMessage: any;
}

interface State {}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleLogoutDialog = this.handleLogoutDialog.bind(this);
    this.navigateEditUsername = this.navigateEditUsername.bind(this);
    this.navigateEditProfileImage = this.navigateEditProfileImage.bind(this);
    this.navigateEditPassword = this.navigateEditPassword.bind(this);
    this.navigateLogin = this.navigateLogin.bind(this);
    this.navigateSignup = this.navigateSignup.bind(this);
    this.navigateTermsOfService = this.navigateTermsOfService.bind(this);
  }

  handleLogoutDialog() {
    const { logout, clearCurrentProfile, addMessage } = this.props;

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
            clearCurrentProfile();
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
              clearCurrentProfile();
              addMessage("ログアウトに成功しました。");
            }
          }
        ],
        { cancelable: true }
      );
    }
  }

  navigateEditUsername() {
    this.props.navigation.navigate("EditUsername");
  }

  navigateEditProfileImage() {
    this.props.navigation.navigate("EditProfileImage");
  }

  navigateEditPassword() {
    this.props.navigation.navigate("EditPassword");
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
    const { auth, currentProfile } = this.props;

    // ログイン中
    if (auth && auth.jwt) {
      return (
        <View style={styles.container}>
          <ConfigureIndexItem
            title="ユーザー名"
            arrowLeftElm={
              auth.currentUser && auth.currentUser.username ? (
                <StandardText text={auth.currentUser.username} fontSize={14} textStyle={{ color: colors.grayLevel2 }} />
              ) : null
            }
            onPress={this.navigateEditUsername}
          />
          <ConfigureIndexItem
            title="プロフィール画像"
            arrowLeftElm={
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={
                  currentProfile && currentProfile.imageUrl
                    ? { uri: currentProfile.imageUrl }
                    : require("../../../../assets/images/no-avatar.png")
                }
              />
            }
            onPress={this.navigateEditProfileImage}
          />
          <ConfigureIndexItem title="パスワード" onPress={this.navigateEditPassword} />
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
  auth: state.auth,
  currentProfile: state.currentProfile.currentProfile
});

const mapDispatchToProps = {
  logout: authAction.logout,
  clearCurrentProfile: currentProfileAction.clearCurrentProfile,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Index);
