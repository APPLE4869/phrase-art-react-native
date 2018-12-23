import { Alert } from "react-native";
import { NavigationParams } from "react-navigation";

export const signinRequestAlert = (purpose: string, navigation: NavigationParams) => {
  Alert.alert(
    "アカウント作成をお願いします",
    `${purpose}にはアカウントが必要です。\n（２０秒ほどで作成できます。）`,
    [{ text: "アカウントを作成", onPress: () => navigation.navigate("SignupModal") }, { text: "キャンセル" }],
    { cancelable: false }
  );
};
