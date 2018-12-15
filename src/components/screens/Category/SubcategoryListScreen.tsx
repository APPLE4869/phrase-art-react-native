import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import * as PhrasesListStatusAction from "../../../actions/Phrase/phrasesListStatus";
import * as SubcategoriesAction from "../../../actions/subcategories";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import SubcategoryItemList from "../../organisms/Category/SubcategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  phrasesListStatus: PhrasesListStatus;
  setPhrasesListStatus: any;
  fetchSubcategoryById: any;
  fetchPhrasesBySubcategoryId: any;
  initializePhrases: any;
  fetchPhrasesByCategoryId: any;
  fetchCategoryById: any;
  initializeSubcategory: any;
  initializeCategory: any;
}

class CategoryListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: <HeaderMenuButton onPress={() => navigation.navigate("PhraseList")} title="キャンセル" />
    };
  };

  constructor(props: Props) {
    super(props);
    this.navigateSubcategoryPhraseList = this.navigateSubcategoryPhraseList.bind(this);
    this.navigateAllSubcategoryPhraseList = this.navigateAllSubcategoryPhraseList.bind(this);
  }

  navigateSubcategoryPhraseList(subcategory: SubcategoryDTO) {
    const {
      initializeSubcategory,
      initializeCategory,
      initializePhrases,
      fetchPhrasesBySubcategoryId,
      setPhrasesListStatus,
      navigation,
      fetchSubcategoryById
    } = this.props;

    // 取得済みの名言を初期化
    initializePhrases();

    // SubcategoryIdを設定
    setPhrasesListStatus("subcategory", subcategory.categoryId, subcategory.id);

    // サブカテゴリーを取得
    initializeSubcategory();
    initializeCategory();
    fetchSubcategoryById(subcategory.id);

    // サブカテゴリーに属する名言を取得
    fetchPhrasesBySubcategoryId(subcategory.id);

    navigation.navigate("PhraseList");
  }

  navigateAllSubcategoryPhraseList() {
    const {
      initializeSubcategory,
      initializeCategory,
      initializePhrases,
      fetchCategoryById,
      setPhrasesListStatus,
      navigation,
      fetchPhrasesByCategoryId
    } = this.props;

    // 取得済みの名言を初期化
    initializePhrases();

    // SubcategoryIdを設定
    setPhrasesListStatus("category", this.categoryId());

    // カテゴリーを取得
    initializeSubcategory();
    initializeCategory();
    fetchCategoryById(this.categoryId());

    // サブカテゴリーを取得
    fetchPhrasesByCategoryId(this.categoryId());

    navigation.navigate("PhraseList");
  }

  categoryId(): string {
    const { navigation, phrasesListStatus } = this.props;
    return navigation.getParam("categoryId") || phrasesListStatus.categoryId;
  }

  render() {
    return (
      <DefaultTemplate>
        <SubcategoryItemList
          categoryId={this.categoryId()}
          onPress={this.navigateSubcategoryPhraseList}
          onPressForAll={this.navigateAllSubcategoryPhraseList}
        />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {
  setPhrasesListStatus: PhrasesListStatusAction.setPhrasesListStatus,
  initializeSubcategory: SubcategoriesAction.initializeSubcategory,
  initializeCategory: CategoriesAction.initializeCategory,
  fetchCategoryById: CategoriesAction.fetchCategoryById,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  fetchPhrasesByCategoryId: PhrasesAction.fetchPhrasesByCategoryId,
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById,
  initializePhrases: PhrasesAction.initializePhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
