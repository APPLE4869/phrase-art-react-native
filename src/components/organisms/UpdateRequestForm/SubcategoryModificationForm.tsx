import * as React from "react";
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import * as SubcategoryModificationRequestAction from "../../../actions/UpdateRequest/subcategoryModificationRequest";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { State as RootState } from "../../../reducers";
import { colors, formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import StandardText from "../../atoms/StandardText";
import TextField from "../../molecules/FormGroup/TextField";
import VideoOnDemandsField from "../../molecules/FormGroup/VideoOnDemandsField";

interface Props {
  subcategory?: SubcategoryDTO;
  videoOnDemands: VideoOnDemandDTO[];
  navigateNextScreen: () => void;
  startLoading: any;
  endLoading: any;
  addMessage: any;
  submitSubcategoryModificationRequest: any;
}

interface State {
  subcategoryName: string;
  videoOnDemandNameKeys: string[];
  introduction?: string;
  imageUri: string;
}

class SubcategoryModificationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { subcategory } = this.props;

    if (!subcategory) {
      this.state = {
        subcategoryName: "",
        videoOnDemandNameKeys: [],
        introduction: "",
        imageUri: ""
      };
      this.errorWhenSubcategoryEmpty();
      return;
    }

    const { name, videoOnDemandNameKeys, introduction } = subcategory;
    this.state = {
      subcategoryName: name || "",
      videoOnDemandNameKeys: videoOnDemandNameKeys || [],
      introduction: introduction || "",
      imageUri: ""
    };

    this.imagePicker = this.imagePicker.bind(this);
    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
    this.onChangeVideoOnDemandNameKeys = this.onChangeVideoOnDemandNameKeys.bind(this);
    this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeSubcategoryName(subcategoryName: string) {
    this.setState({ subcategoryName });
  }

  onChangeVideoOnDemandNameKeys(videoOnDemandNameKeys: string[]) {
    this.setState({ videoOnDemandNameKeys });
  }

  onChangeIntroduction(introduction: string) {
    this.setState({ introduction });
  }

  imageStyle() {
    const { width: windowWidth } = Dimensions.get("window");
    const width = windowWidth;
    const height = windowWidth * 0.4;
    return { width, height };
  }

  isDisabled(): boolean {
    const { subcategoryName } = this.state;

    if (subcategoryName && this.isAnyChanged()) {
      return false;
    }

    return true;
  }

  isAnyChanged(): boolean {
    if (!this.props.subcategory) {
      return false;
    }

    const {
      name: currentSubcategoryName,
      videoOnDemandNameKeys: currentVideoOnDemandNameKeys,
      introduction: currentIntroduction
    } = this.props.subcategory;
    const { subcategoryName, imageUri, videoOnDemandNameKeys, introduction } = this.state;

    return (
      currentSubcategoryName !== subcategoryName ||
      !!imageUri ||
      String(currentVideoOnDemandNameKeys.sort()) !== String(videoOnDemandNameKeys.sort()) ||
      (currentIntroduction || "") !== introduction
    );
  }

  imagePicker() {
    const options = {
      title: "イメージ画像を選択して下さい",
      takePhotoButtonTitle: "写真を撮る",
      chooseFromLibraryButtonTitle: "アルバムから選択",
      cancelButtonTitle: "キャンセル",
      maxHeight: 700,
      maxWidth: 1000,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // ユーザーがキャンセルした
      } else if (response.error) {
        // ImagePicker のエラー
        Alert.alert("プロフィール画像の選択に失敗しました");
      } else {
        this.setState({ imageUri: response.uri });
      }
    });
  }

  errorWhenSubcategoryEmpty() {
    Alert.alert("予期しないエラーが発生しました。お手数ですが、もう一度お試しください。");
    this.props.navigateNextScreen();
  }

  async onSubmit() {
    const {
      subcategory,
      submitSubcategoryModificationRequest,
      startLoading,
      endLoading,
      navigateNextScreen,
      addMessage
    } = this.props;
    const { subcategoryName, imageUri, introduction, videoOnDemandNameKeys } = this.state;
    startLoading();

    try {
      await submitSubcategoryModificationRequest(
        (subcategory as SubcategoryDTO).id,
        subcategoryName.trim(),
        imageUri,
        introduction ? introduction.trim() : introduction,
        videoOnDemandNameKeys
      );
    } finally {
      endLoading();
    }

    addMessage("修正申請に成功しました。");
    navigateNextScreen();
  }

  imageSource() {
    const { subcategory } = this.props;
    const { imageUri } = this.state;

    if (imageUri) {
      return { uri: imageUri };
    } else if (subcategory && subcategory.imageUrl) {
      return { uri: subcategory.imageUrl };
    } else {
      return require("../../../../assets/images/no-subcategory-background.jpg");
    }
  }

  render() {
    const { subcategory, videoOnDemands } = this.props;
    const { subcategoryName, videoOnDemandNameKeys, introduction } = this.state;

    if (!subcategory) {
      this.errorWhenSubcategoryEmpty();
      return;
    }

    return (
      <View style={{ flex: 1, width: "100%" }}>
        <View style={{ width: "100%" }}>
          <Image style={this.imageStyle()} source={this.imageSource()} />
          <TouchableOpacity activeOpacity={0.8} onPress={this.imagePicker} style={styles.imageFrame}>
            <Image
              resizeMode="contain"
              style={{ width: 33, height: 37 }}
              source={require("../../../../assets/images/icon/camera.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={formStyle.container}>
          <View style={{ marginTop: 30 }}>
            <StandardText text="カテゴリー" fontSize={13} textStyle={{ color: colors.grayLevel2, marginBottom: 5 }} />
            <StandardText text={subcategory.categoryName} fontSize={15} />
          </View>
          <TextField
            label="サブカテゴリー"
            placeholder="経営者"
            onChangeText={this.onChangeSubcategoryName}
            defaultValue={subcategoryName}
            marginTop={30}
          />
          {subcategory.videoOnDemandAssociated ? (
            <VideoOnDemandsField
              label="この作品が観れる動画配信サービス"
              onChangeVideoOnDemandNameKeys={this.onChangeVideoOnDemandNameKeys}
              values={videoOnDemandNameKeys}
              videoOnDemands={videoOnDemands}
            />
          ) : null}
          <TextField
            label="紹介文"
            placeholder="組織の経営について責任を持つ者のことを経営者と呼ぶ。"
            onChangeText={this.onChangeIntroduction}
            marginBottom={40}
            defaultValue={introduction}
            isTextarea={true}
          />
          <FormButton title="修正申請する" onPress={this.onSubmit} disabled={this.isDisabled()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = (state: RootState) => ({
  subcategory: state.subcategories.subcategory,
  videoOnDemands: state.videoOnDemands.videoOnDemands
});

const mapDispatchToProps = {
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage,
  submitSubcategoryModificationRequest: SubcategoryModificationRequestAction.submitSubcategoryModificationRequest
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryModificationForm);
