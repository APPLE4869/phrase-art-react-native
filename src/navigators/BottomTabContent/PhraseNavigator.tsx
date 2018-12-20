import { createStackNavigator } from "react-navigation";
import SubcategoryDetailScreen from "../../components/screens/Phrase/Category/SubcategoryDetailScreen";
import SubcategoryModificationRequestScreen from "../../components/screens/Phrase/Category/SubcategoryModificationRequestScreen";
import PhraseDetailScreen from "../../components/screens/Phrase/DetailScreen";
import PhraseListScreenScreen from "../../components/screens/Phrase/ListScreen";
import UpdateRequestFormDeletionRequestScreen from "../../components/screens/Phrase/UpdateRequestForm/DeletionRequestScreen";
import UpdateRequestFormModificationRequestScreen from "../../components/screens/Phrase/UpdateRequestForm/ModificationRequestScreen";
import UpdateRequestFormRegistrationRequestScreen from "../../components/screens/Phrase/UpdateRequestForm/RegistrationRequestScreen";
import NavigationOptions from "../NavigationOptions";

const PhraseStack = createStackNavigator(
  {
    PhraseList: { screen: PhraseListScreenScreen, navigationOptions: { title: "名言一覧" } },
    PhraseDetail: { screen: PhraseDetailScreen, navigationOptions: { title: "名言詳細" } },
    UpdateRequestFormRegistrationRequest: {
      screen: UpdateRequestFormRegistrationRequestScreen,
      navigationOptions: { title: "名言登録申請" }
    },
    UpdateRequestFormModificationRequest: {
      screen: UpdateRequestFormModificationRequestScreen,
      navigationOptions: { title: "名言修正申請" }
    },
    UpdateRequestFormDeletionRequest: {
      screen: UpdateRequestFormDeletionRequestScreen,
      navigationOptions: { title: "名言削除申請" }
    },
    SubcategoryDetail: {
      screen: SubcategoryDetailScreen,
      navigationOptions: { title: "サブカテゴリー詳細" }
    },
    SubcategoryModificationRequest: {
      screen: SubcategoryModificationRequestScreen,
      navigationOptions: { title: "サブカテゴリー修正申請" }
    }
  },
  {
    initialRouteName: "PhraseList",
    navigationOptions: NavigationOptions
  }
);

export default PhraseStack;
