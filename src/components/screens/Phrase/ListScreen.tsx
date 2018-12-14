import * as React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../../actions/subcategories";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../../reducers";
import * as PhrasesReducers from "../../../reducers/phrase/phrases";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import CategoryPanelOnList from "../../organisms/CategoryPanelOnList";
import PhraseItemList from "../../organisms/Phrase/PhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  auth: any;
  subcategory: SubcategoryDTO | undefined;
  phrasesListStatus: PhrasesReducers.PhrasesListStatus;
  fetchSubcategoryById: any;
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

    const { phrasesListStatus, fetchSubcategoryById } = this.props;
    const subcategoryId = phrasesListStatus.subcategoryId;
    if (subcategoryId) {
      fetchSubcategoryById(subcategoryId);
    }
  }

  componentDidMount() {
    const { navigation, phrasesListStatus } = this.props;
    navigation.setParams({ onPressForRight: this.navigateRegistrationRequest });
    this.setHeaderLeftMenu(phrasesListStatus.subcategoryId);
  }

  componentDidUpdate(prevProps: Props) {
    const { phrasesListStatus: prevPhrasesListStatus } = prevProps;
    const { phrasesListStatus: currentPhrasesListStatus } = this.props;

    if (prevPhrasesListStatus.subcategoryId !== currentPhrasesListStatus.subcategoryId) {
      this.setHeaderLeftMenu(currentPhrasesListStatus.subcategoryId);
    }
  }

  setHeaderLeftMenu(subcategoryId?: string) {
    const { navigation } = this.props;

    if (subcategoryId) {
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
    const { subcategory } = this.props;

    return (
      <DefaultTemplate>
        <View style={{ width: "100%", flex: 1 }}>
          <CategoryPanelOnList subcategory={subcategory} />
          <PhraseItemList navigateDetail={this.navigateDetail} />
        </View>
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  subcategory: state.subcategories.subcategory,
  phrasesListStatus: state.phrases.phrasesListStatus
});

const mapDispatchToProps = {
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseListScreen);
