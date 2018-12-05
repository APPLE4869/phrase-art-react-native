import { createStackNavigator } from "react-navigation";
import UpdateRequestInProgressScreen from "../../components/screens/UpdateRequest/InProgressScreen";
import NavigationOptions from "./NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    UpdateRequestInProgress: { screen: UpdateRequestInProgressScreen, navigationOptions: { title: "申請一覧" } }
  },
  {
    initialRouteName: "UpdateRequestInProgress",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
