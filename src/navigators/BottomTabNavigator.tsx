import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { colors } from "../styles";
import ConfigureNavigator, {
  visibleBottomTabIndex as configureVisibleBottomTabIndex
} from "./BottomTabContent/ConfigureNavigator";
import PhraseNavigator, {
  visibleBottomTabIndex as phraseVisibleBottomTabIndex
} from "./BottomTabContent/PhraseNavigator";
import SearchNavigator, {
  visibleBottomTabIndex as searchVisibleBottomTabIndex
} from "./BottomTabContent/SearchNavigator";
import UpdateRequestNavigator, {
  visibleBottomTabIndex as updateRequestVisibleBottomTabIndex
} from "./BottomTabContent/UpdateRequestNavigator";

// タブアイコン
type TabIconType = "phrase" | "updateRequest" | "search" | "configure";
const tabIconDir = "../../assets/images/icon/navigation";
const tabIconPaths = {
  phrase: {
    active: require(`${tabIconDir}/phrase-active.png`),
    inactive: require(`${tabIconDir}/phrase.png`)
  },
  updateRequest: {
    active: require(`${tabIconDir}/update-request-active.png`),
    inactive: require(`${tabIconDir}/update-request.png`)
  },
  search: {
    active: require(`${tabIconDir}/search-active.png`),
    inactive: require(`${tabIconDir}/search.png`)
  },
  configure: {
    active: require(`${tabIconDir}/configure-active.png`),
    inactive: require(`${tabIconDir}/configure.png`)
  }
};

const navigationOptionsConfigure = (title: string, iconType: TabIconType) => ({
  title,
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    return focused ? (
      <Image style={{ width: 28, height: 28 }} resizeMode="contain" source={tabIconPaths[iconType].active} />
    ) : (
      <Image style={{ width: 28, height: 28 }} resizeMode="contain" source={tabIconPaths[iconType].inactive} />
    );
  }
});

type BottomTabTypes = "PhraseTab" | "UpdateRequestTab" | "SearchTab" | "ConfigureTab";

const visibleBottomTabScreenIndex = {
  PhraseTab: configureVisibleBottomTabIndex,
  UpdateRequestTab: phraseVisibleBottomTabIndex,
  SearchTab: searchVisibleBottomTabIndex,
  ConfigureTab: updateRequestVisibleBottomTabIndex
};

export default createBottomTabNavigator(
  {
    PhraseTab: {
      screen: PhraseNavigator,
      navigationOptions: navigationOptionsConfigure("名言", "phrase")
    },
    UpdateRequestTab: {
      screen: UpdateRequestNavigator,
      navigationOptions: navigationOptionsConfigure("申請", "updateRequest")
    },
    SearchTab: {
      screen: SearchNavigator,
      navigationOptions: navigationOptionsConfigure("検索", "search")
    },
    ConfigureTab: {
      screen: ConfigureNavigator,
      navigationOptions: navigationOptionsConfigure("設定", "configure")
    }
  },
  {
    backBehavior: "none",
    navigationOptions: ({ navigation }) => {
      const currentRouteName = navigation.state.routeName as BottomTabTypes;
      const currentIndex = navigation.state.index;
      const isVisible = visibleBottomTabScreenIndex[currentRouteName].includes(currentIndex);
      return { tabBarVisible: isVisible };
    },
    tabBarOptions: {
      activeTintColor: colors.clickable,
      activeBackgroundColor: colors.transparentClickable,
      inactiveTintColor: colors.grayLevel2,
      style: {
        backgroundColor: colors.special.navigationBarBackground,
        height: 58
      },
      tabStyle: {
        marginTop: 2,
        borderRadius: 7
      },
      labelStyle: {
        marginTop: 2,
        marginBottom: 3,
        fontSize: 10,
        letterSpacing: 0.3,
        fontWeight: "bold"
      }
    }
  }
);
