import { createStackNavigator } from "react-navigation";
import CategoryListScreen from "../components/screens/Category/ListScreen";
import PhraseDetailScreen from "../components/screens/Phrase/DetailScreen";
import PhraseListScreenScreen from "../components/screens/Phrase/ListScreen";
import SubcategoryListScreen from "../components/screens/Subcategory/ListScreen";
import { colors } from "../styles";

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
      headerBackTitle: "戻る",
      headerTintColor: colors.clickable,
      headerTitleStyle: { color: colors.baseBlack },
      headerPressColorAndroid: colors.baseBlack
    }
  }
);

const CategoryStack = createStackNavigator(
  {
    CategoryList: { screen: CategoryListScreen, navigationOptions: { title: "カテゴリー" } },
    SubcategoryList: { screen: SubcategoryListScreen, navigationOptions: { title: "サブカテゴリー" } }
  },
  {
    initialRouteName: "CategoryList",
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.special.navigationBarBackground,
        elevation: 0,
        borderBottomColor: colors.special.navigationBarBorder
      }
    }
  }
);

export default createStackNavigator(
  {
    Phrase: {
      screen: PhraseStack
    },
    CategoryModal: {
      screen: CategoryStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
