import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
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
  }

  navigateSubcategoryPhraseList(subcategory: SubcategoryDTO) {
    const {
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
    fetchSubcategoryById(subcategory.id);

    // サブカテゴリーに属する名言を取得
    fetchPhrasesBySubcategoryId(subcategory.id);

    navigation.navigate("PhraseList", { subcategoryId: subcategory.id });
  }

  categoryId(): string {
    const { navigation, phrasesListStatus } = this.props;
    return navigation.getParam("categoryId") || phrasesListStatus.categoryId;
  }

  render() {
    return (
      <DefaultTemplate>
        <SubcategoryItemList categoryId={this.categoryId()} onPress={this.navigateSubcategoryPhraseList} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {
  setPhrasesListStatus: PhrasesListStatusAction.setPhrasesListStatus,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById,
  initializePhrases: PhrasesAction.initializePhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
