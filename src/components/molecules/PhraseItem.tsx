import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhraseDTO from "../../models/dto/PhraseDTO";
import { colors } from "../../styles";

interface Props {
  phrase: PhraseDTO;
  navigateDetail: (phraseId: string) => void;
}

const MAX_ITEM_TEXT: number = 35;

export default class PhraseItem extends React.Component<Props> {
  itemTextView(text: string) {
    const textLine = text.replace(/\n/g, "");
    return textLine.length > MAX_ITEM_TEXT ? `${textLine.substr(0, MAX_ITEM_TEXT)}...` : textLine;
  }

  render() {
    const { navigateDetail, phrase } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateDetail(phrase.id)} style={styles.item}>
        <View style={styles.itemCategoryArea}>
          <Text style={styles.itemCategoryAreaMain}>{phrase.categoryName}</Text>
          <Image
            style={{ width: 8, height: 8 }}
            source={require("../../../assets/images/icon/angle-right-gray2.png")}
          />
          <Text style={styles.itemCategoryAreaSub}>{phrase.subcategoryName}</Text>
        </View>
        <Text style={styles.itemPhraseContent}>{this.itemTextView(phrase.content)}</Text>
        <Text style={styles.itemAuthorName}>{phrase.authorName}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: colors.grayLevel4
  },
  itemCategoryArea: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemCategoryAreaMain: {
    color: colors.grayLevel2,
    fontSize: 12,
    marginRight: 7
  },
  itemCategoryAreaSub: {
    color: colors.grayLevel2,
    fontSize: 12,
    marginLeft: 12
  },
  itemPhraseContent: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.8,
    marginVertical: 10,
    color: colors.baseBlack
  },
  itemAuthorName: {
    fontSize: 12,
    letterSpacing: 1,
    color: colors.baseBlack
  }
});
