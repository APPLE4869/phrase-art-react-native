import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import * as SubcategoriesAction from "../../../actions/subcategories";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import CategoryItemList from "../../organisms/CategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  initializeSubcategory: any;
  initializePhrases: any;
  fetchPhrases: any;
  initializePhrasesListStatus: any;
}

class CategoryListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <HeaderMenuButton onPress={() => navigation.navigate("PhraseList")} title="キャンセル" />
    };
  };

  constructor(props: Props) {
    super(props);

    this.navigateSubcategoryList = this.navigateSubcategoryList.bind(this);
    this.navigatePhraseList = this.navigatePhraseList.bind(this);
  }

  navigateSubcategoryList(categoryId: string) {
    this.props.navigation.navigate("SubcategoryList", { categoryId });
  }

  navigatePhraseList() {
    const {
      initializeSubcategory,
      initializePhrases,
      fetchPhrases,
      navigation,
      initializePhrasesListStatus
    } = this.props;

    // 取得済みの名言を初期化
    initializePhrases();

    // SubcategoryIdを設定
    initializeSubcategory();

    // 一覧のステータスを初期化
    initializePhrasesListStatus();

    // サブカテゴリーを取得
    fetchPhrases();

    navigation.navigate("PhraseList");
  }

  render() {
    return (
      <DefaultTemplate>
        <CategoryItemList onPress={this.navigateSubcategoryList} onPressForAll={this.navigatePhraseList} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  initializeSubcategory: SubcategoriesAction.initializeSubcategory,
  initializePhrases: PhrasesAction.initializePhrases,
  fetchPhrases: PhrasesAction.fetchPhrases,
  initializePhrasesListStatus: PhrasesAction.initializePhrasesListStatus
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
