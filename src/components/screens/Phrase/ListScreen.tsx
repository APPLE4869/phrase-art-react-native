import * as React from "react";
import { Alert, Button, Image, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import CategoryPanelOnList from "../../organisms/CategoryPanelOnList";
import PhraseItemList from "../../organisms/Phrase/PhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  auth: any;
}

class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerLeft: (
        <Button onPress={() => navigation.navigate("CategoryModal")} title="カテゴリー" color={colors.clickable} />
      ),
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={navigation.getParam("navigateRegistrationRequest")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/plus.png")} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.navigateDetail = this.navigateDetail.bind(this);
    this.navigateRegistrationRequest = this.navigateRegistrationRequest.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateRegistrationRequest: this.navigateRegistrationRequest });
  }

  navigateRegistrationRequest() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "名言の登録を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。",
        [{ text: "OK" }]
      );
      return;
    }

    this.props.navigation.navigate("UpdateRequestFormRegistrationRequest");
  }

  navigateDetail(phraseId: string) {
    this.props.navigation.navigate("PhraseDetail", { phraseId });
  }

  render() {
    return (
      <DefaultTemplate>
        <View style={{ width: "100%", flex: 1 }}>
          <CategoryPanelOnList />
          <PhraseItemList navigateDetail={this.navigateDetail} />
        </View>
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseListScreen);
