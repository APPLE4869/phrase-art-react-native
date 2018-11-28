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
}

interface State {
  loading: boolean;
}

class PhraseItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false };

    this.fetchPhraseWithAwait = this.fetchPhraseWithAwait.bind(this);
    this.props.fetchPhrases();
  }

  async fetchPhraseWithAwait() {
    if (this.state.loading === true) {
      return;
    }

    this.setState({ loading: true });

    await this.props.fetchPhrases();

    this.setState({ loading: false });
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
  fetchPhrases: PhrasesAction.fetchPhrases
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseItemList);
