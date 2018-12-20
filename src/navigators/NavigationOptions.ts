import { colors } from "../styles";

export default {
  headerStyle: {
    backgroundColor: colors.special.navigationBarBackground,
    elevation: 0,
    borderBottomColor: colors.special.navigationBarBorder,
    marginHorizontal: 15
  },
  headerBackTitle: null,
  headerTintColor: colors.clickable,
  headerTitleStyle: { color: colors.baseBlack, fontSize: 17 },
  headerPressColorAndroid: colors.baseBlack
};
