import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import * as PhrasesAction from "../../actions/Phrase/phrases";
import { State as RootState } from "../../reducers";
import { colors } from "../../styles";

interface Props {
  onNavigateAfterSearch?: () => void;
  fetchPhrasesBySearchWord: any;
  addSearchedWord: any;
  initializeSearchedPhrase: any;
  searchedWord?: string;
}

interface State {
  searchWord: string;
}

class SearchWindow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { searchedWord } = this.props;
    this.state = { searchWord: searchedWord || "" };

    this.onSearch = this.onSearch.bind(this);
    this.onChangeSearchWord = this.onChangeSearchWord.bind(this);
  }

  onSearch() {
    const { initializeSearchedPhrase, addSearchedWord, fetchPhrasesBySearchWord, onNavigateAfterSearch } = this.props;
    const { searchWord } = this.state;
    if (!searchWord) {
      return;
    }

    initializeSearchedPhrase();
    addSearchedWord(searchWord);
    fetchPhrasesBySearchWord(searchWord);

    if (onNavigateAfterSearch) {
      onNavigateAfterSearch();
    }
  }

  onChangeSearchWord(searchWord: string) {
    this.setState({ searchWord });
  }

  render() {
    const { searchWord } = this.state;

    return (
      <TextInput
        style={styles.searchWindow}
        placeholder="検索"
        maxLength={50}
        returnKeyType="search"
        value={searchWord}
        onSubmitEditing={this.onSearch}
        onChangeText={this.onChangeSearchWord}
      />
    );
  }
}

const styles = StyleSheet.create({
  searchWindow: {
    backgroundColor: colors.white,
    width: "100%",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 12
  }
});

const mapStateToProps = (state: RootState) => ({
  searchedWord: state.phrases.searchedWord
});

const mapDispatchToProps = {
  fetchPhrasesBySearchWord: PhrasesAction.fetchPhrasesBySearchWord,
  initializeSearchedPhrase: PhrasesAction.initializeSearchedPhrase,
  addSearchedWord: PhrasesAction.addSearchedWord
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SearchWindow);
