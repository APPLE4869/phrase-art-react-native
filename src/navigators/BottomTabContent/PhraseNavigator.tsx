import { createStackNavigator } from "react-navigation";
import PhraseDetailScreen from "../../components/screens/Phrase/DetailScreen";
import PhraseListScreenScreen from "../../components/screens/Phrase/ListScreen";
import UpdateRequestFormRegistrationRequestScreen from "../../components/screens/Phrase/UpdateRequestForm/RegistrationRequestScreen";
import NavigationOptions from "./NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    PhraseList: { screen: PhraseListScreenScreen, navigationOptions: { title: "名言一覧" } },
    PhraseDetail: { screen: PhraseDetailScreen, navigationOptions: { title: "名言詳細" } },
    UpdateRequestFormRegistrationRequest: {
      screen: UpdateRequestFormRegistrationRequestScreen,
      navigationOptions: { title: "名言登録申請" }
    }
  },
  {
    initialRouteName: "PhraseList",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
