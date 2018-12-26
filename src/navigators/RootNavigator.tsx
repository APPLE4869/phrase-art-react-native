import { createStackNavigator } from "react-navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import CategoryNavigator from "./CategoryNavigator";
import SignupModalNavigator from "./SignupModalNavigator";

const RootNavigator = createStackNavigator(
  {
    BottomTab: BottomTabNavigator,
    CategoryModal: CategoryNavigator,
    SignupModal: SignupModalNavigator
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default RootNavigator;
