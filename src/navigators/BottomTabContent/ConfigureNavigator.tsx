import { createStackNavigator } from "react-navigation";
import EditProfileImageScreen from "../../components/screens/Configure/EditProfileImageScreen";
import ConfigureIndexScreen from "../../components/screens/Configure/IndexScreen";
import ConfigureLoginScreen from "../../components/screens/Configure/LoginScreen";
import ConfigureSignupScreen from "../../components/screens/Configure/SignupScreen";
import NavigationOptions from "./NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    ConfigureIndex: { screen: ConfigureIndexScreen, navigationOptions: { title: "設定" } },
    EditProfileImage: { screen: EditProfileImageScreen, navigationOptions: { title: "プロフィール画像" } },
    ConfigureLogin: { screen: ConfigureLoginScreen, navigationOptions: { title: "ログイン" } },
    ConfigureSignup: { screen: ConfigureSignupScreen, navigationOptions: { title: "アカウント作成" } }
  },
  {
    initialRouteName: "ConfigureIndex",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
