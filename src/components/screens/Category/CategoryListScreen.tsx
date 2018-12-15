import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import * as PhrasesListStatusAction from "../../../actions/Phrase/phrasesListStatus";
import * as SubcategoriesAction from "../../../actions/subcategories";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import CategoryItemList from "../../organisms/Category/CategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  initializeCategory: any;
  initializeSubcategory: any;
  initializePhrases: any;
  fetchPhrases: any;
  initializePhrasesListStatus: any;
  initializeSubcategories: any;
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

  navigateSubcategoryList(category: CategoryDTO) {
    this.props.initializeSubcategories();
    this.props.navigation.navigate("SubcategoryList", { categoryId: category.id });
  }

  navigatePhraseList() {
    const {
      initializeCategory,
      initializeSubcategory,
      initializePhrases,
      fetchPhrases,
      navigation,
      initializePhrasesListStatus
    } = this.props;

    // 取得済みの名言を初期化
    initializePhrases();

    // Categoryを設定
    initializeCategory();
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
  initializeCategory: CategoriesAction.initializeCategory,
  initializeSubcategory: SubcategoriesAction.initializeSubcategory,
  initializePhrases: PhrasesAction.initializePhrases,
  fetchPhrases: PhrasesAction.fetchPhrases,
  initializePhrasesListStatus: PhrasesListStatusAction.initializePhrasesListStatus,
  initializeSubcategories: SubcategoriesAction.initializeSubcategories
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
