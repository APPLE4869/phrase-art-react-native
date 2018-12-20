import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import * as SubcategoryModificationRequestAction from "../../../actions/UpdateRequest/subcategoryModificationRequest";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { State as RootState } from "../../../reducers";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import TextField from "../../molecules/FormGroup/TextField";
import VideoOnDemandsField from "../../molecules/FormGroup/VideoOnDemandsField";

interface Props {
  subcategoryId: string;
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
  imagePath?: string;
  videoOnDemandNameKeys: string[];
  introduction?: string;
}

class SubcategoryModificationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { subcategory } = this.props;
    if (subcategory) {
      const { name, imageUrl, videoOnDemandNameKeys, introduction } = subcategory;
      this.state = {
        subcategoryName: name || "",
        imagePath: imageUrl || "",
        videoOnDemandNameKeys: videoOnDemandNameKeys || [],
        introduction: introduction || ""
      };
    } else {
      this.state = {
        subcategoryName: "",
        imagePath: "",
        videoOnDemandNameKeys: [],
        introduction: ""
      };
    }

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
      imageUrl: currentImagePath,
      videoOnDemandNameKeys: currentVideoOnDemandNameKeys,
      introduction: currentIntroduction
    } = this.props.subcategory;
    const { subcategoryName, imagePath, videoOnDemandNameKeys, introduction } = this.state;

    return (
      currentSubcategoryName !== subcategoryName ||
      currentImagePath !== imagePath ||
      String(currentVideoOnDemandNameKeys.sort()) !== String(videoOnDemandNameKeys.sort()) ||
      currentIntroduction !== introduction
    );
  }

  async onSubmit() {
    const {
      subcategoryId,
      submitSubcategoryModificationRequest,
      startLoading,
      endLoading,
      navigateNextScreen,
      addMessage
    } = this.props;
    const { subcategoryName, introduction, videoOnDemandNameKeys } = this.state;
    startLoading();

    try {
      await submitSubcategoryModificationRequest(subcategoryId, subcategoryName, introduction, videoOnDemandNameKeys);
    } finally {
      endLoading();
    }

    addMessage("修正申請に成功しました。");
    navigateNextScreen();
  }

  render() {
    const { subcategory, videoOnDemands } = this.props;
    const { subcategoryName, videoOnDemandNameKeys, introduction } = this.state;

    if (!subcategory) {
      return null;
    }

    return (
      <View style={formStyle.container}>
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
    );
  }
}

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
