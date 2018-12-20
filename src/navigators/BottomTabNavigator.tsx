import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { colors } from "../styles";
import ConfigureNavigator from "./BottomTabContent/ConfigureNavigator";
import PhraseNavigator from "./BottomTabContent/PhraseNavigator";
import UpdateRequestNavigator from "./BottomTabContent/UpdateRequestNavigator";

// タブアイコン
type TabIconType = "phrase" | "updateRequest" | "configure";
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
  configure: {
    active: require(`${tabIconDir}/configure-active.png`),
    inactive: require(`${tabIconDir}/configure.png`)
  }
};

const navigationOptionsConfigure = (title: string, iconType: TabIconType) => ({
  title,
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    return focused ? (
      <Image style={{ marginTop: 2 }} source={tabIconPaths[iconType].active} />
    ) : (
      <Image style={{ marginTop: 2 }} source={tabIconPaths[iconType].inactive} />
    );
  }
});

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
    ConfigureTab: {
      screen: ConfigureNavigator,
      navigationOptions: navigationOptionsConfigure("設定", "configure")
    }
  },
  {
    backBehavior: "none",
    navigationOptions: ({ navigation }) => {
      return { tabBarVisible: navigation.state.index === 0 };
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
        fontWeight: "bold"
      }
    }
  }
);
