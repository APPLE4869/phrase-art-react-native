import * as React from "react";
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as VideoOnDemandsAction from "../../../actions/videoOnDemands";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  subcategory?: SubcategoryDTO;
  videoOnDemands: VideoOnDemandDTO[];
  fetchVideoOnDemands: any;
}

class SubcategoryDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { fetchVideoOnDemands } = this.props;
    fetchVideoOnDemands();
  }

  videoOnDemandBlock(videoOnDemand: VideoOnDemandDTO) {
    const { subcategory } = this.props;

    if (!subcategory) {
      return;
    }

    const isActive = subcategory.videoOnDemandNameKeys.includes(videoOnDemand.nameKey);

    return (
      <View style={{ width: "50%", alignItems: "center" }}>
        <Image
          style={{ width: 95, height: 95, opacity: isActive ? 1 : 0.7 }}
          source={{
            uri: videoOnDemand.imageUrl
          }}
        />
        {isActive ? (
          this.toAppLink(videoOnDemand)
        ) : (
          <StandardText text="未対応" fontSize={14} textStyle={{ color: colors.grayLevel2, marginTop: 10 }} />
        )}
      </View>
    );
  }

  toAppLink(videoOnDemand: VideoOnDemandDTO) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (!videoOnDemand.appDeepLink) {
            Linking.openURL(videoOnDemand.url);
            return;
          }
          Linking.canOpenURL(videoOnDemand.appDeepLink).then(supported => {
            if (supported) {
              Linking.openURL(videoOnDemand.appDeepLink as string);
            } else {
              Linking.openURL(videoOnDemand.url);
            }
          });
        }}
        style={{ marginTop: 10 }}
      >
        <StandardText text="今すぐ観てみる" fontSize={14} textStyle={{ color: colors.clickable }} />
      </TouchableOpacity>
    );
  }

  imageArea(imageUrl?: string) {
    if (imageUrl) {
      return <Image style={this.imageStyle()} source={{ uri: imageUrl }} />;
    } else {
      const emptyImage = require("../../../../assets/images/no-subcategory-background.jpg");
      return (
        <View style={{ width: "100%" }}>
          <Image style={this.imageStyle()} source={emptyImage} />
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <StandardText fontSize={14} text="イメージ画像 未登録" />
          </View>
        </View>
      );
    }
  }

  imageStyle() {
    const { width: windowWidth } = Dimensions.get("window");
    const window = windowWidth;
    const height = windowWidth * 0.4;
    return { window, height };
  }

  render() {
    const { subcategory, videoOnDemands } = this.props;

    if (!subcategory || !videoOnDemands) {
      return null;
    }

    return (
      <View style={{ width: "100%", flex: 1 }}>
        {this.imageArea(subcategory.imageUrl)}
        <ScrollView style={styles.container}>
          <View style={styles.itemMarginBottom}>
            <StandardText text={subcategory.categoryName} fontSize={14} textStyle={styles.label} />
            <StandardText text={subcategory.name} fontSize={16} />
          </View>
          {subcategory.videoOnDemandAssociated ? (
            <View style={styles.itemMarginBottom}>
              <StandardText text="この作品が観れる動画配信サービス" fontSize={14} textStyle={styles.label} />
              <View style={styles.videoOnDemandContainer}>
                {videoOnDemands.map(videoOnDemand => this.videoOnDemandBlock(videoOnDemand))}
              </View>
            </View>
          ) : null}
          <View>
            <StandardText text="紹介文" fontSize={14} textStyle={styles.label} />
            <StandardText text={subcategory.introduction || "未登録"} fontSize={16} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 15
  },
  itemMarginBottom: {
    marginBottom: 30
  },
  label: {
    color: colors.grayLevel2,
    marginBottom: 4
  },
  videoOnDemandContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 5
  }
});

const mapStateToProps = (state: RootState) => ({
  subcategory: state.subcategories.subcategory,
  videoOnDemands: state.videoOnDemands.videoOnDemands
});

const mapDispatchToProps = {
  fetchVideoOnDemands: VideoOnDemandsAction.fetchVideoOnDemands
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryDetail);
