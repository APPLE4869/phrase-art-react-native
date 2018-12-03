import { createStackNavigator } from "react-navigation";
import UpdateRequestInProgressScreen from "../../components/screens/UpdateRequest/InProgressScreen";
import { colors } from "../../styles";

const PhraseStack = createStackNavigator(
  {
    UpdateRequestInProgress: { screen: UpdateRequestInProgressScreen, navigationOptions: { title: "申請一覧" } }
  },
  {
    initialRouteName: "UpdateRequestInProgress",
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
