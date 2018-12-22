import * as React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import CategoryPanelOnList from "../../organisms/CategoryPanelOnList";
import PhraseItemList from "../../organisms/Phrase/PhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  auth: any;
  phrasesListStatus: PhrasesListStatus;
}

class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    const onPressForLeft = navigation.getParam("onPressForLeft");
    const titleForLeft = navigation.getParam("categoryListTitle");
    const onPressForRight = navigation.getParam("onPressForRight");

    return {
      headerLeft: <HeaderMenuButton onPress={onPressForLeft} title={titleForLeft} />,
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={onPressForRight}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/plus.png")} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.navigateDetail = this.navigateDetail.bind(this);
    this.navigateCategoryList = this.navigateCategoryList.bind(this);
    this.navigateSubcategoryList = this.navigateSubcategoryList.bind(this);
    this.navigateRegistrationRequest = this.navigateRegistrationRequest.bind(this);
    this.navigateSubcategoryDetail = this.navigateSubcategoryDetail.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ onPressForRight: this.navigateRegistrationRequest });
    this.setHeaderLeftMenu();
  }

  componentDidUpdate(prevProps: Props) {
    const { categoryId: prevCategoryId, subcategoryId: prevSubcategoryId } = prevProps.phrasesListStatus;
    const { categoryId: currentCategoryId, subcategoryId: currentSubcategoryId } = this.props.phrasesListStatus;

    if (prevCategoryId !== currentCategoryId || prevSubcategoryId !== currentSubcategoryId) {
      this.setHeaderLeftMenu();
    }
  }

  setHeaderLeftMenu() {
    const { navigation, phrasesListStatus } = this.props;

    if (phrasesListStatus.categoryId || phrasesListStatus.subcategoryId) {
      navigation.setParams({ onPressForLeft: this.navigateSubcategoryList });
      navigation.setParams({ categoryListTitle: "サブカテゴリー" });
    } else {
      navigation.setParams({ onPressForLeft: this.navigateCategoryList });
      navigation.setParams({ categoryListTitle: "カテゴリー" });
    }
  }

  navigateCategoryList() {
    const { navigation } = this.props;
    navigation.navigate("CategoryModal");
  }

  navigateSubcategoryList() {
    const { navigation } = this.props;
    navigation.navigate("SubcategoryList");
  }

  navigateSubcategoryDetail() {
    const { navigation } = this.props;
    navigation.navigate("SubcategoryDetail");
  }

  navigateRegistrationRequest() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "名言の登録を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。\n（作成は２０秒でできます。）",
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
          <PhraseItemList
            navigateDetail={this.navigateDetail}
            navigateSubcategoryDetail={this.navigateSubcategoryDetail}
          />
        </View>
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseListScreen);
