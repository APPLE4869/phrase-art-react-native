import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import * as SubcategoriesAction from "../../../actions/subcategories";
import HeaderMenuButton from "../../atoms/HeaderMenuButton";
import SubcategoryItemList from "../../organisms/SubcategoryItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  fetchSubcategoryById: any;
  setPhrasesStatusAbountSubcategoryId: any;
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

  navigateSubcategoryPhraseList(subcategoryId: string) {
    const {
      initializePhrases,
      fetchPhrasesBySubcategoryId,
      setPhrasesStatusAbountSubcategoryId,
      navigation,
      fetchSubcategoryById
    } = this.props;

    // 取得済みの名言を初期化
    initializePhrases();

    // SubcategoryIdを設定
    setPhrasesStatusAbountSubcategoryId(subcategoryId);

    // サブカテゴリーを取得
    fetchSubcategoryById(subcategoryId);

    // サブカテゴリーに属する名言を取得
    fetchPhrasesBySubcategoryId(subcategoryId);

    navigation.navigate("PhraseList", { subcategoryId });
  }

  render() {
    const categoryId: string = this.props.navigation.getParam("categoryId");

    return (
      <DefaultTemplate>
        <SubcategoryItemList categoryId={categoryId} onPress={this.navigateSubcategoryPhraseList} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setPhrasesStatusAbountSubcategoryId: PhrasesAction.setPhrasesStatusAbountSubcategoryId,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById,
  initializePhrases: PhrasesAction.initializePhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryListScreen);
