import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/phrases";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import MarginTemplate from "../../templates/MarginTemplate";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO | undefined;
  fetchPhraseById: any; // typeof PhrasesAction.fetchPhraseById;
}

class PhraseDetailScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const phraseId = this.props.navigation.getParam("phraseId");

    this.props.fetchPhraseById(phraseId);
  }

  render() {
    const { phrase } = this.props;

    if (phrase === undefined) {
      return null;
    }

    return (
      <MarginTemplate>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>グループ</Text>
            <Text style={styles.rowContent}>{phrase.categoryName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>名言</Text>
            <Text style={styles.rowContent}>{phrase.content}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>作者</Text>
            <Text style={styles.rowContent}>{phrase.authorName}</Text>
          </View>
        </View>
      </MarginTemplate>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 25
  },
  rowLabel: {
    marginBottom: 5,
    fontSize: 13,
    color: colors.grayLevel2
  },
  rowContent: {
    fontSize: 16,
    lineHeight: 24
  }
});

const mapStateToProps = (state: RootState) => ({
  phrase: state.phrases.phrase
});

const mapDispatchToProps = {
  fetchPhraseById: PhrasesAction.fetchPhraseById
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseDetailScreen);
