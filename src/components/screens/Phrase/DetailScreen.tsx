import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
        <View style={styles.item}>
          <View style={styles.itemCategoryArea}>
            <Text style={styles.itemCategoryAreaMain}>{phrase.categoryName}</Text>
            <Image
              style={{ width: 8, height: 8 }}
              source={require("../../../../assets/images/icon/angle-right-gray2.png")}
            />
            <Text style={styles.itemCategoryAreaSub}>{phrase.subcategoryName}</Text>
          </View>
          <Text style={styles.itemPhraseContent}>{phrase.content}</Text>
          <Text style={styles.itemAuthorName}>{phrase.authorName}</Text>
        </View>
      </MarginTemplate>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: "100%"
  },
  itemCategoryArea: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemCategoryAreaMain: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginRight: 7
  },
  itemCategoryAreaSub: {
    color: colors.grayLevel2,
    fontSize: 13,
    marginLeft: 12
  },
  itemPhraseContent: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.8,
    marginVertical: 13,
    color: colors.baseBlack
  },
  itemAuthorName: {
    fontSize: 13,
    letterSpacing: 1,
    color: colors.baseBlack
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
