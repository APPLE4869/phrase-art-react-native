import * as React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import * as PhrasesReducers from "../../../reducers/phrases";
import { colors } from "../../../styles";
import PhraseItem from "../../molecules/PhraseItem";

interface Props {
  navigateDetail: (phraseId: string) => void;
  phrases: PhraseDTO[];
  phrasesListStatus: PhrasesReducers.PhrasesListStatus;
  fetchPhrases: any; // typeof PhrasesAction.fetchPhrases;
  fetchPhrasesBySubcategoryId: any;
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

    this.props.initializePhrases();
    this.props.initializePhrasesListStatus();
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

  async fetchPhrases(offset: number = 0) {
    const { fetchPhrases, phrasesListStatus, fetchPhrasesBySubcategoryId } = this.props;

    const subcategoryId = phrasesListStatus.subcategoryId;

    if (subcategoryId) {
      await fetchPhrasesBySubcategoryId(subcategoryId, offset);
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

  render() {
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={this.props.phrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        renderItem={({ item: phrase }) => <PhraseItem navigateDetail={this.props.navigateDetail} phrase={phrase} />}
        onEndReached={() => this.fetchPhraseWithAwait()}
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
  phrases: state.phrases.phrases,
  phrasesListStatus: state.phrases.phrasesListStatus
});

const mapDispatchToProps = {
  fetchPhrases: PhrasesAction.fetchPhrases,
  fetchPhrasesBySubcategoryId: PhrasesAction.fetchPhrasesBySubcategoryId,
  initializePhrases: PhrasesAction.initializePhrases,
  initializePhrasesListStatus: PhrasesAction.initializePhrasesListStatus
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseItemList);
