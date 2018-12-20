import { createStackNavigator } from "react-navigation";
import CategoryListScreen from "../components/screens/Category/CategoryListScreen";
import SubcategoryListScreen from "../components/screens/Category/SubcategoryListScreen";
import NavigationOptions from "./NavigationOptions";

const CategoryStack = createStackNavigator(
  {
    CategoryList: { screen: CategoryListScreen, navigationOptions: { title: "カテゴリー" } },
    SubcategoryList: { screen: SubcategoryListScreen, navigationOptions: { title: "サブカテゴリー" } }
  },
  {
    initialRouteName: "CategoryList",
    navigationOptions: NavigationOptions
  }
);

export default CategoryStack;
