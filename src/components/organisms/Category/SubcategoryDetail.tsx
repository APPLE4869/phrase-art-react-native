import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../../actions/subcategories";
import * as VideoOnDemandsAction from "../../../actions/videoOnDemands";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  subcategory?: SubcategoryDTO;
  videoOnDemands: VideoOnDemandDTO[];
  fetchVideOnDemands: any;
  subcategoryId: string;
  fetchSubcategoryById: any;
  initializeSubcategory: any;
}

class SubcategoryDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { subcategoryId, fetchSubcategoryById, fetchVideOnDemands, initializeSubcategory } = this.props;
    initializeSubcategory();
    fetchVideOnDemands();
    fetchSubcategoryById(subcategoryId);
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
          <StandardText text="対応" fontSize={14} textStyle={{ marginTop: 10 }} />
        ) : (
          <StandardText text="未対応" fontSize={14} textStyle={{ color: colors.grayLevel2, marginTop: 10 }} />
        )}
      </View>
    );
  }

  render() {
    const { subcategory, videoOnDemands } = this.props;

    if (!subcategory || !videoOnDemands) {
      return null;
    }

    return (
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
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById,
  fetchVideOnDemands: VideoOnDemandsAction.fetchVideOnDemands,
  initializeSubcategory: SubcategoriesAction.initializeSubcategory
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryDetail);
