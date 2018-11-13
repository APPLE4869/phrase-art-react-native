import { createStackNavigator } from "react-navigation";
import PhraseDetailScreen from "../components/screens/PhraseDetailScreen";
import PhraseListScreen from "../components/screens/PhraseListScreen";
import { colors } from "../styles";

export default createStackNavigator(
  {
    PhraseList: { screen: PhraseListScreen, navigationOptions: { title: "名言一覧" } },
    PhraseDetail: { screen: PhraseDetailScreen, navigationOptions: { title: "名言詳細" } }
  },
  {
    initialRouteName: "PhraseList",
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.white,
      headerTitleStyle: {}
    }
  }
);
