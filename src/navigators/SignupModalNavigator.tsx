import { createStackNavigator } from "react-navigation";
import SignupModalScreen from "../components/screens/SignupModalScreen";
import NavigationOptions from "./NavigationOptions";

const SignupModalStack = createStackNavigator(
  { SignupModal: { screen: SignupModalScreen, navigationOptions: { title: "アカウント作成" } } },
  {
    initialRouteName: "SignupModal",
    navigationOptions: NavigationOptions
  }
);

export default SignupModalStack;
