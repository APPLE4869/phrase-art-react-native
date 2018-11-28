import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PhrasesAction from "../../actions/phrases";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { State as RootState } from "../../reducers";
import * as PhrasesReducers from "../../reducers/phrases";
import PhraseItem from "../molecules/PhraseItem";

interface Props {
  navigateDetail: (phraseId: string) => void;
  phrases: PhraseDTO[];
  phrasesListStatus: PhrasesReducers.PhrasesListStatus;
  fetchPhrases: any; // typeof PhrasesAction.fetchPhrases;
  fetchPhrasesBySubcategoryId: any;
  initializePhrases: any;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
}

class PhraseItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false };
    this.fetchPhraseWithAwait = this.fetchPhraseWithAwait.bind(this);

    this.props.initializePhrases();
    this.fetchPhrases();
  }

  async fetchPhraseWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { phrases } = this.props;

    this.setState({ loading: true });

    const offset: number = phrases.length;
    await this.fetchPhrases(offset);

    if (this.props.phrases.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  fetchPhrases(offset: number = 0) {
    const { fetchPhrases, phrasesListStatus, fetchPhrasesBySubcategoryId } = this.props;

    const subcategoryId = phrasesListStatus.subcategoryId;

    if (subcategoryId) {
      fetchPhrasesBySubcategoryId(subcategoryId, offset);
    } else {
      fetchPhrases(offset);
    }
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching } = this.state;

    return loading || stopFetching;
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.phrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        renderItem={({ item: phrase }) => <PhraseItem navigateDetail={this.props.navigateDetail} phrase={phrase} />}
        onEndReached={() => this.fetchPhraseWithAwait()}
        onEndReachedThreshold={3}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  phrases: state.phrases.phrases,
  phrasesListStatus: state.phrases.phrasesListStatus
});

const mapDispatchToProps = {
  fetchPhrases: PhrasesAction.fetchPhrases,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  initializePhrases: PhrasesAction.initializePhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseItemList);
