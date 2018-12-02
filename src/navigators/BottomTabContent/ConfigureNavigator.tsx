import { createStackNavigator } from "react-navigation";
import ConfigureIndexScreen from "../../components/screens/Configure/IndexScreen";
import ConfigureLoginScreen from "../../components/screens/Configure/LoginScreen";
import ConfigureSignupScreen from "../../components/screens/Configure/SignupScreen";
import { colors } from "../../styles";

const PhraseStack = createStackNavigator(
  {
    ConfigureIndex: { screen: ConfigureIndexScreen, navigationOptions: { title: "設定" } },
    ConfigureLogin: { screen: ConfigureLoginScreen, navigationOptions: { title: "ログイン" } },
    ConfigureSignup: { screen: ConfigureSignupScreen, navigationOptions: { title: "会員登録" } }
  },
  {
    initialRouteName: "ConfigureIndex",
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.special.navigationBarBackground,
        elevation: 0,
        borderBottomColor: colors.special.navigationBarBorder
      },
      headerBackTitle: null,
      headerTintColor: colors.clickable,
      headerTitleStyle: { color: colors.baseBlack },
      headerPressColorAndroid: colors.baseBlack
    }
  }
);

export default PhraseStack;
