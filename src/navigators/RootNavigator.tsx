import { createStackNavigator } from "react-navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import CategoryNavigator from "./CategoryNavigator";

const RootNavigator = createStackNavigator(
  {
    BottomTab: BottomTabNavigator,
    CategoryModal: CategoryNavigator
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default RootNavigator;
