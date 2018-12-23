import * as React from "react";
import { Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import * as PhrasesListStatusAction from "../../../actions/Phrase/phrasesListStatus";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import PhraseItem from "../../molecules/PhraseItem";

interface Props {
  navigateSubcategoryDetail: () => void;
  navigateDetail: (phraseId: string) => void;
  phrases: PhraseDTO[];
  category?: CategoryDTO;
  subcategory?: SubcategoryDTO;
  phrasesListStatus: PhrasesListStatus;
  fetchPhrases: any; // typeof PhrasesAction.fetchPhrases;
  fetchPhrasesByCategoryId: any;
  fetchPhrasesBySubcategoryId: any;
  likePhrase: any;
  unlikePhrase: any;
  favoritePhrase: any;
  unfavoritePhrase: any;
  initializePhrases: any;
  initializePhrasesListStatus: any;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
  refreshLoading: boolean;
}

class PhraseItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false, refreshLoading: false };
    this.fetchPhraseWithAwait = this.fetchPhraseWithAwait.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.likeAction = this.likeAction.bind(this);
    this.unlikeAction = this.unlikeAction.bind(this);
    this.favoriteAction = this.favoriteAction.bind(this);
    this.unfavoriteAction = this.unfavoriteAction.bind(this);

    this.props.initializePhrases();
    this.props.initializePhrasesListStatus();
    this.fetchPhrases();
  }

  async fetchPhraseWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    this.setState({ loading: true });

    const { phrases } = this.props;
    const offset: number = phrases.length;
    await this.fetchPhrases(offset);

    if (this.props.phrases.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps: Props) {
    const { categoryId: prevCategoryId, subcategoryId: prevSubcategoryId } = prevProps.phrasesListStatus;
    const { categoryId: currentCategoryId, subcategoryId: currentSubcategoryId } = this.props.phrasesListStatus;

    if (prevCategoryId !== currentCategoryId || prevSubcategoryId !== currentSubcategoryId) {
      this.setState({ stopFetching: false });
    }
  }

  ListHeaderComponent() {
    const { category, subcategory, navigateSubcategoryDetail } = this.props;

    if (subcategory && subcategory.imageUrl) {
      const { width: windowWidth } = Dimensions.get("window");
      const height = windowWidth * 0.4;

      return <TouchableOpacity onPress={navigateSubcategoryDetail} style={{ height }} />;
    } else if (subcategory) {
      const height = 70;
      return <TouchableOpacity onPress={navigateSubcategoryDetail} style={{ height }} />;
    } else if (category) {
      const { width: windowWidth } = Dimensions.get("window");
      const height = windowWidth * 0.4;

      return <View style={{ height }} />;
    }

    return null;
  }

  async fetchPhrases(offset: number = 0) {
    const { fetchPhrases, phrasesListStatus, fetchPhrasesByCategoryId, fetchPhrasesBySubcategoryId } = this.props;

    const { categoryId, subcategoryId } = phrasesListStatus;

    if (subcategoryId) {
      await fetchPhrasesBySubcategoryId(subcategoryId, offset);
    } else if (categoryId) {
      await fetchPhrasesByCategoryId(categoryId, offset);
    } else {
      await fetchPhrases(offset);
    }
  }

  async onRefresh() {
    const { initializePhrases } = this.props;

    initializePhrases();

    await this.fetchPhrases();
    this.setState({ stopFetching: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching, refreshLoading } = this.state;
    return loading || stopFetching || refreshLoading;
  }

  likeAction(phrase: PhraseDTO) {
    this.props.likePhrase(phrase);
  }

  unlikeAction(phrase: PhraseDTO) {
    this.props.unlikePhrase(phrase);
  }

  favoriteAction(phrase: PhraseDTO) {
    this.props.favoritePhrase(phrase);
  }

  unfavoriteAction(phrase: PhraseDTO) {
    this.props.unfavoritePhrase(phrase);
  }

  render() {
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={this.props.phrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        ListHeaderComponent={this.ListHeaderComponent()}
        renderItem={({ item: phrase, index }) => (
          <PhraseItem
            likeAction={this.likeAction}
            unlikeAction={this.unlikeAction}
            favoriteAction={this.favoriteAction}
            unfavoriteAction={this.unfavoriteAction}
            navigateDetail={this.props.navigateDetail}
            phrase={phrase}
            isFirst={index === 0}
          />
        )}
        onEndReached={this.fetchPhraseWithAwait}
        onEndReachedThreshold={3}
        refreshing={refreshLoading}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={this.onRefresh} tintColor={colors.grayLevel4} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1
  }
});

const mapStateToProps = (state: RootState) => ({
  category: state.categories.category,
  subcategory: state.subcategories.subcategory,
  phrases: state.phrases.phrases,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {
  fetchPhrases: PhrasesAction.fetchPhrases,
  fetchPhrasesByCategoryId: PhrasesAction.fetchPhrasesByCategoryId,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  likePhrase: PhrasesAction.likePhrase,
  unlikePhrase: PhrasesAction.unlikePhrase,
  favoritePhrase: PhrasesAction.favoritePhrase,
  unfavoritePhrase: PhrasesAction.unfavoritePhrase,
  initializePhrases: PhrasesAction.initializePhrases,
  initializePhrasesListStatus: PhrasesListStatusAction.initializePhrasesListStatus
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseItemList);
