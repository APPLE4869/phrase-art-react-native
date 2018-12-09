import * as React from "react";
import { ActionSheetIOS, Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/phrases";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import MarginTemplate from "../../templates/MarginTemplate";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO | undefined;
  fetchPhraseById: any; // typeof PhrasesAction.fetchPhraseById;
  auth: any;
}

class PhraseDetailScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={navigation.getParam("handleEditDialog")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/edit.png")} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.fetchPhraseById(phraseId);

    this.handleEditDialog = this.handleEditDialog.bind(this);
    this.navigateModificationRequest = this.navigateModificationRequest.bind(this);
    this.navigateDeletionRequest = this.navigateDeletionRequest.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleEditDialog: this.handleEditDialog });
  }

  handleEditDialog() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "名言の修正・削除を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。",
        [{ text: "OK" }]
      );
      return;
    }

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["キャンセル", "修正を申請する", "削除を申請する"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this.navigateModificationRequest();
          } else if (buttonIndex === 2) {
            this.navigateDeletionRequest();
          }
        }
      );
    } else {
      Alert.alert(
        "修正、削除のどちらを申請するか選択してください。",
        undefined,
        [
          { text: "キャンセル", style: "cancel" },
          { text: "修正を申請する", onPress: this.navigateModificationRequest },
          { text: "削除を申請する", onPress: this.navigateDeletionRequest }
        ],
        { cancelable: true }
      );
    }
  }

  navigateModificationRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormModificationRequest", { phrase });
  }

  navigateDeletionRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormDeletionRequest", { phrase });
  }

  render() {
    const { phrase } = this.props;

    if (phrase === undefined) {
      return null;
    }

    return (
      <MarginTemplate>
        <View style={styles.item}>
          <View style={styles.itemCategoryArea}>
            <Text style={styles.itemCategoryAreaMain}>{phrase.categoryName}</Text>
            <Image
              style={{ width: 8, height: 8 }}
              source={require("../../../../assets/images/icon/angle-right-gray2.png")}
            />
            <Text style={styles.itemCategoryAreaSub}>{phrase.subcategoryName}</Text>
          </View>
          <Text style={styles.itemPhraseContent}>{phrase.content}</Text>
          <Text style={styles.itemAuthorName}>{phrase.authorName}</Text>
        </View>
      </MarginTemplate>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: "100%"
  },
  itemCategoryArea: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemCategoryAreaMain: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginRight: 7
  },
  itemCategoryAreaSub: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginLeft: 12
  },
  itemPhraseContent: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.8,
    marginVertical: 13,
    color: colors.baseBlack
  },
  itemAuthorName: {
    fontSize: 13,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});

const mapStateToProps = (state: RootState) => ({
  phrase: state.phrases.phrase,
  auth: state.auth
});

const mapDispatchToProps = {
  fetchPhraseById: PhrasesAction.fetchPhraseById
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseDetailScreen);
