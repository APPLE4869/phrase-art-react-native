import { colors } from "../../styles";

export default {
  headerStyle: {
    backgroundColor: colors.special.navigationBarBackground,
    elevation: 0,
    borderBottomColor: colors.special.navigationBarBorder,
    marginRight: 15,
    marginLeft: 8
  },
  headerBackTitle: null,
  headerTintColor: colors.clickable,
  headerTitleStyle: { color: colors.baseBlack, fontSize: 18 },
  headerPressColorAndroid: colors.baseBlack
};
