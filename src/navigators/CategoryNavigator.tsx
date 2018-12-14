import { createStackNavigator } from "react-navigation";
import CategoryListScreen from "../components/screens/Category/ListScreen";
import SubcategoryListScreen from "../components/screens/Subcategory/ListScreen";
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
