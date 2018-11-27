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

class ItemList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.fetchPhrases();
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.phrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        renderItem={({ item: phrase }) => <PhraseItem navigateDetail={this.props.navigateDetail} phrase={phrase} />}
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

export default enhancer(ItemList);
