import { createStackNavigator } from "react-navigation";
import PhraseUpdateRequestScreen from "../../components/screens/UpdateRequest/Details/PhraseUpdateRequest";
import UpdateRequestListScreen from "../../components/screens/UpdateRequest/ListScreen";
import NavigationOptions from "./NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    UpdateRequestList: { screen: UpdateRequestListScreen, navigationOptions: { title: "申請一覧" } },
    PhraseUpdateRequest: { screen: PhraseUpdateRequestScreen }
  },
  {
    initialRouteName: "UpdateRequestList",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
