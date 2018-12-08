import { createStackNavigator } from "react-navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import CategoryNavigator from "./CategoryNavigator";

const RootNavigator = createStackNavigator(
  {
    PhrBottomTab: BottomTabNavigator,
    CategoryModal: CategoryNavigator
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default RootNavigator;
