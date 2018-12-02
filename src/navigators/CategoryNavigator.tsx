import { createStackNavigator } from "react-navigation";
import CategoryListScreen from "../components/screens/Category/ListScreen";
import SubcategoryListScreen from "../components/screens/Subcategory/ListScreen";
import { colors } from "../styles";

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

export default CategoryStack;
