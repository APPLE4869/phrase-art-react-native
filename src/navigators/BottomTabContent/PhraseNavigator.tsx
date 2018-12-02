import { createStackNavigator } from "react-navigation";
import PhraseDetailScreen from "../../components/screens/Phrase/DetailScreen";
import PhraseListScreenScreen from "../../components/screens/Phrase/ListScreen";
import { colors } from "../../styles";

const PhraseStack = createStackNavigator(
  {
    PhraseList: { screen: PhraseListScreenScreen, navigationOptions: { title: "名言一覧" } },
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
      headerBackTitle: null,
      headerTintColor: colors.clickable,
      headerTitleStyle: { color: colors.baseBlack },
      headerPressColorAndroid: colors.baseBlack
    }
  }
);

export default PhraseStack;
