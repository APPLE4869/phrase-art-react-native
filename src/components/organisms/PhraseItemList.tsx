import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PhrasesAction from "../../actions/phrases";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { State as RootState } from "../../reducers";
import PhraseItem from "../molecules/PhraseItem";

interface Props {
  navigateDetail: (phraseId: string) => void;
  phrases: PhraseDTO[];
  fetchPhrases: any; // typeof PhrasesAction.fetchPhrases;
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

    const { initializePhrases, fetchPhrases } = this.props;

    initializePhrases();
    fetchPhrases();
  }

  async fetchPhraseWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { phrases, fetchPhrases } = this.props;

    this.setState({ loading: true });

    const offset: number = phrases.length;
    await fetchPhrases(offset);

    if (this.props.phrases.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
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
  phrases: state.phrases.phrases
});

const mapDispatchToProps = {
  fetchPhrases: PhrasesAction.fetchPhrases,
  initializePhrases: PhrasesAction.initializePhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseItemList);
