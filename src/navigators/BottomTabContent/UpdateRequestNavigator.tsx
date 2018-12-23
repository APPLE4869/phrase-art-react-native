import { createStackNavigator } from "react-navigation";
import UpdateRequestListScreen from "../../components/screens/UpdateRequest/ListScreen";
import PhraseUpdateRequestDetailScreen from "../../components/screens/UpdateRequest/PhraseUpdateRequestDetail";
import SubcategoryModificationRequestDetailScreen from "../../components/screens/UpdateRequest/SubcategoryModificationRequestDetailScreen";
import NavigationOptions from "../NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    UpdateRequestList: { screen: UpdateRequestListScreen, navigationOptions: { title: "申請一覧" } },
    PhraseUpdateRequestDetail: { screen: PhraseUpdateRequestDetailScreen },
    SubcategoryModificationRequestDetail: {
      screen: SubcategoryModificationRequestDetailScreen,
      navigationOptions: { title: "サブカテゴリー修正申請" }
    }
  },
  {
    initialRouteName: "UpdateRequestList",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;

export const visibleBottomTabIndex = [0];
