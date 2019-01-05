import * as React from "react";
import { Image, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  onPress: () => void;
  checked: boolean;
  name: string;
  imageSource?: any;
  totalPhraseCount?: number;
  totalCommentCount?: number;
  totalLikeCount?: number;
  totalFavoriteCount?: number;
}

const CARD_SIDE_MARGIN = 3;
const CARD_PADDING = 3;

export default class CategoryCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  imageHeight() {
    const windowSize = Dimensions.get("window");
    return (windowSize.width * (1 - CARD_SIDE_MARGIN * 2 / 100) - (CARD_PADDING * 2)) * (0.4);
  }

  render() {
    const {
      onPress,
      checked,
      name,
      imageSource,
      totalPhraseCount,
      totalCommentCount,
      totalLikeCount,
      totalFavoriteCount
    } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.item}>
        <Image
          style={{ width: "100%", height: this.imageHeight() }}
          source={imageSource || require("../../../../assets/images/no-image.png")}
        />
        {checked ? (
          <View style={{ position: "absolute", top: 10, right: 10 }}>
            <Image
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
              source={require("../../../../assets/images/icon/check-circle-gray.png")}
            />
          </View>
        ) : null}

        <View style={styles.itemBottom}>
          <Text style={styles.itemName}>{name}</Text>
          <View style={styles.itemCounts}>
            {totalPhraseCount !== undefined ? (
              <View style={[styles.itemCountsItem, { marginRight: 14 }]}>
                <Image
                  style={{ width: 13, height: 13 }}
                  resizeMode="contain"
                  source={require("../../../../assets/images/icon/category-card/post.png")}
                />
                <StandardText
                  text={String(totalPhraseCount)}
                  fontSize={11}
                  textStyle={{ color: colors.grayLevel1, marginLeft: 7 }}
                />
              </View>
            ) : null}

            {totalCommentCount !== undefined ? (
              <View style={[styles.itemCountsItem, { marginRight: 15 }]}>
                <Image
                  style={{ width: 14, height: 14 }}
                  resizeMode="contain"
                  source={require("../../../../assets/images/icon/category-card/comment.png")}
                />
                <StandardText
                  text={String(totalCommentCount)}
                  fontSize={11}
                  textStyle={{ color: colors.grayLevel1, marginLeft: 7 }}
                />
              </View>
            ) : null}

            {totalLikeCount !== undefined ? (
              <View style={[styles.itemCountsItem, { marginRight: 11 }]}>
                <Image
                  style={{ width: 14, height: 14 }}
                  resizeMode="contain"
                  source={require("../../../../assets/images/icon/category-card/like.png")}
                />
                <StandardText
                  text={String(totalLikeCount)}
                  fontSize={11}
                  textStyle={{ color: colors.grayLevel1, marginLeft: 5 }}
                />
              </View>
            ) : null}

            {totalLikeCount !== undefined ? (
              <View style={styles.itemCountsItem}>
                <Image
                  style={{ width: 15, height: 15, bottom: 1 }}
                  resizeMode="contain"
                  source={require("../../../../assets/images/icon/category-card/favorite.png")}
                />
                <StandardText
                  text={String(totalFavoriteCount)}
                  fontSize={11}
                  textStyle={{ color: colors.grayLevel1, marginLeft: 5 }}
                />
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    marginHorizontal: `${CARD_SIDE_MARGIN}%`,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0,
    shadowOpacity: 0.1,
    padding: CARD_PADDING,
    borderRadius: 1
  },
  itemBottom: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  itemName: {
    fontSize: 15,
    letterSpacing: 1,
    color: colors.baseBlack,
    fontWeight: "bold"
  },
  itemCounts: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  itemCountsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCountsText: {
    fontSize: 11,
    marginLeft: 10
  }
});
