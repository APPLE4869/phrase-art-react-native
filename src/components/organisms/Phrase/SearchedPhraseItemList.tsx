import * as React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { NavigationEventsProps } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import PhraseItem from "../../molecules/PhraseItem";

interface Props {
  navigation: NavigationEventsProps;
  navigateDetail: (phraseId: string) => void;
  searchedPhrases: PhraseDTO[];
  fetchPhrasesBySearchWord: any;
  searchedWord?: string;
  initializeSearchedPhrase: any;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
  refreshLoading: boolean;
}

class SearchedPhraseItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false, refreshLoading: false };
    this.fetchPhraseWithAwait = this.fetchPhraseWithAwait.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    const { searchedPhrases: prevSearchedPhrases } = prevProps;
    const { searchedPhrases: nextSearchedPhrases } = this.props;

    if (prevSearchedPhrases.length > 0 && nextSearchedPhrases.length === 0) {
      this.setState({ stopFetching: false });
    }
  }

  async fetchPhraseWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    this.setState({ loading: true });

    const { searchedPhrases, fetchPhrasesBySearchWord, searchedWord } = this.props;
    const offset: number = searchedPhrases.length;
    await fetchPhrasesBySearchWord(searchedWord, offset);

    if (this.props.searchedPhrases.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  async onRefresh() {
    const { initializeSearchedPhrase, fetchPhrasesBySearchWord, searchedWord } = this.props;

    initializeSearchedPhrase();

    await fetchPhrasesBySearchWord(searchedWord);
    this.setState({ stopFetching: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching, refreshLoading } = this.state;
    return loading || stopFetching || refreshLoading;
  }

  render() {
    const { navigation } = this.props;
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={this.props.searchedPhrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        renderItem={({ item: phrase, index }) => (
          <PhraseItem
            navigation={navigation}
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
  },
  emptyItemText: {
    textAlign: "center",
    color: colors.grayLevel1,
    marginBottom: 10
  }
});

const mapStateToProps = (state: RootState) => ({
  searchedWord: state.phrases.searchedWord,
  searchedPhrases: state.phrases.searchedPhrases
});

const mapDispatchToProps = {
  fetchPhrasesBySearchWord: PhrasesAction.fetchPhrasesBySearchWord,
  initializeSearchedPhrase: PhrasesAction.initializeSearchedPhrase
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SearchedPhraseItemList);
