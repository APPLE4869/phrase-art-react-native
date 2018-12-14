import { createStackNavigator } from "react-navigation";
import UpdateRequestListScreen from "../../components/screens/UpdateRequest/ListScreen";
import PhraseUpdateRequestDetailScreen from "../../components/screens/UpdateRequest/PhraseUpdateRequestDetail";
import NavigationOptions from "../NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    UpdateRequestList: { screen: UpdateRequestListScreen, navigationOptions: { title: "申請一覧" } },
    PhraseUpdateRequestDetail: { screen: PhraseUpdateRequestDetailScreen }
  },
  {
    initialRouteName: "UpdateRequestList",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
