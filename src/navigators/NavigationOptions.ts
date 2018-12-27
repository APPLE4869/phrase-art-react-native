import { Platform } from "react-native";
import { colors } from "../styles";

export default {
  headerStyle: {
    backgroundColor: colors.special.navigationBarBackground,
    elevation: 0,
    borderBottomColor: colors.special.navigationBarBorder,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0
  },
  headerBackTitle: null,
  headerTintColor: colors.clickable,
  headerTitleStyle: { color: colors.baseBlack, fontSize: 16 },
  headerPressColorAndroid: colors.baseBlack
};
