import { createStackNavigator } from "react-navigation";
import PhraseDetail from "../components/screens/PhraseDetail";
import PhraseList from "../components/screens/PhraseList";

export default createStackNavigator({
  PhraseDetailScreen: { screen: PhraseDetail },
  PhraseListScreen: { screen: PhraseList }
});
