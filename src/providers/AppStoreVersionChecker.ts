import { Alert, Linking, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import firebase from "react-native-firebase";

if (__DEV__) {
  firebase.config().enableDeveloperMode();
}

// Set default values
firebase.config().setDefaults({
  latestAppStoreVersion: "1.0.0"
});

// 新しいバージョンのアプリがストアに配布されいないかチェックします。
// ストアに直接見に行くわけではなく、FirebaseRemoteConfigで最新のバージョン番号を設定しています。
// https://console.firebase.google.com/u/3/project/phrase-art/config
const checkNewVersion = async () => {
  try {
    await firebase.config().fetch();
    await firebase.config().activateFetched();

    const snapshot = await firebase.config().getValue("latestAppStoreVersion");
    const latestAppStoreVersion = snapshot.val();
    const appVersion = DeviceInfo.getVersion();

    // 新しいバージョンのアプリがストアに配布されている場合は更新を促す
    if (appVersion < latestAppStoreVersion) {
      showUpgradePrompt();
    }
  } catch (e) {
    throw e;
  }
};

const showUpgradePrompt = () => {
  Alert.alert(
    "アップデート情報",
    "Phrase Artの新しいバージョンが利用可能です。最新版にアップデートしてご利用ください。",
    [{ text: "後で通知", style: "cancel" }, { text: "アップデート", onPress: () => attemptUpgrade() }]
  );
};

const attemptUpgrade = () => {
  if (Platform.OS === "ios") {
    const appId = 1442217383;
    const itunesURI = `itms-apps://itunes.apple.com/jp/app/id${appId}?mt=8`;
    const itunesURL = `https://itunes.apple.com/jp/app/id${appId}?mt=8`;

    Linking.canOpenURL(itunesURI).then(supported => {
      if (supported) {
        Linking.openURL(itunesURI);
      } else {
        Linking.openURL(itunesURL);
      }
    });
  } else {
    const appId = "com.phraseart";
    const playStoreURI = `market://details?id=${appId}`;
    const playStoreURL = `https://play.google.com/store/apps/details?id=${appId}`;
    Linking.canOpenURL(playStoreURI).then(supported => {
      if (supported) {
        Linking.openURL(playStoreURI);
      } else {
        Linking.openURL(playStoreURL);
      }
    });
  }
};

export default checkNewVersion;
