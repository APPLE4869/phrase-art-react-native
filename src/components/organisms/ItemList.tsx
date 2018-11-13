import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import phraseLib, { Phrase } from "../../lib/phrases"; // TODO: APIでの読み込みに変更する
import PhraseItem from "../molecules/PhraseItem";

interface Props {
  navigateDetail: (phraseId: string) => void;
}

export default class ItemList extends React.Component<Props> {
  render() {
    return (
      <FlatList
        style={styles.container}
        data={phraseLib}
        keyExtractor={(phrase: Phrase) => phrase.id}
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
