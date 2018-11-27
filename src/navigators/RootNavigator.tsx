import { createStackNavigator } from "react-navigation";
import PhraseDetailScreen from "../components/screens/Phrase/DetailScreen";
import PhraseListScreen from "../components/screens/Phrase/ListScreen";
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
        backgroundColor: colors.special.navigationBarBackground,
        elevation: 0,
        borderBottomColor: colors.special.navigationBarBorder
      },
      headerBackTitle: "戻る",
      headerTintColor: colors.clickable,
      headerTitleStyle: { color: colors.baseBlack },
      headerPressColorAndroid: colors.baseBlack
    }
  }
);
