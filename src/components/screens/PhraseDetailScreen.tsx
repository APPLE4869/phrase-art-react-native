import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationParams } from "react-navigation";
import phraseLib, { Phrase } from "../../lib/phrases"; // TODO: APIでの読み込みに変更する
import { colors } from "../../styles";
import MarginTemplate from "../templates/MarginTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseDetailScreen extends React.Component<Props> {
  private phrase: Phrase | undefined;

  constructor(props: Props) {
    super(props);

    const phraseId = this.props.navigation.getParam("phraseId");

    for (const phrase of phraseLib) {
      if (phrase.id === phraseId) {
        this.phrase = phrase;
        break;
      }
    }
  }

  render() {
    if (this.phrase === undefined) {
      return null;
    }

    return (
      <MarginTemplate>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>グループ</Text>
            <Text style={styles.rowContent}>{this.phrase.group}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>名言</Text>
            <Text style={styles.rowContent}>{this.phrase.text}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>作者</Text>
            <Text style={styles.rowContent}>{this.phrase.author}</Text>
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
