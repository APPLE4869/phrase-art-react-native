import { createStackNavigator } from "react-navigation";
import FavoriteDetailScreen from "../../components/screens/Search/FavoriteDetailScreen";
import FavoriteListScreen from "../../components/screens/Search/FavoriteListScreen";
import RootScreen from "../../components/screens/Search/RootScreen";
import SearchedDetailScreen from "../../components/screens/Search/SearchedDetailScreen";
import SearchedListScreen from "../../components/screens/Search/SearchedListScreen";
import NavigationOptions from "../NavigationOptions";

const SearchStack = createStackNavigator(
  {
    RootList: { screen: RootScreen, navigationOptions: { title: null } },
    FavoriteList: { screen: FavoriteListScreen, navigationOptions: { title: "お気に入り" } },
    SearchedList: { screen: SearchedListScreen, navigationOptions: { title: null } },
    FavoriteDetail: { screen: FavoriteDetailScreen, navigationOptions: { title: "名言詳細" } },
    SearchedDetail: { screen: SearchedDetailScreen, navigationOptions: { title: "名言詳細" } }
  },
  {
    initialRouteName: "RootList",
    navigationOptions: NavigationOptions
  }
);

export default SearchStack;

export const visibleBottomTabIndex = [0, 1];
