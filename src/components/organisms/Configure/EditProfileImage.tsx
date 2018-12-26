import * as React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import * as currentProfileAction from "../../../actions/currentProfile";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import CurrentProfile from "../../../models/dto/CurrentProfileDTO";
import { State as RootState } from "../../../reducers";
import { colors, formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import StandardText from "../../atoms/StandardText";

interface Props {
  navigateConfigureIndex: () => void;
  currentProfile: CurrentProfile | undefined;
  startLoading: any;
  endLoading: any;
  addMessage: any;
  fetchProfile: any;
  registerProfile: any;
}

interface State {
  imageUri: string;
  initialized: boolean;
}

class EditProfileImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { imageUri: "", initialized: false };

    this.imagePicker = this.imagePicker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.initialize();
  }

  async initialize() {
    try {
      await this.props.fetchProfile();
    } finally {
      this.setState({ initialized: true });
    }

    const { currentProfile } = this.props;
    if (currentProfile) {
      this.setState({ imageUri: currentProfile.imageUrl || "" });
    }
  }

  isDisabled(): boolean {
    const { currentProfile } = this.props;
    const { imageUri, initialized } = this.state;

    if (initialized && imageUri && (!currentProfile || currentProfile.imageUrl !== imageUri)) {
      return false;
    }
    return true;
  }

  imagePicker() {
    const options = {
      title: "プロフィール画像を選択して下さい",
      takePhotoButtonTitle: "写真を撮る",
      chooseFromLibraryButtonTitle: "アルバムから選択",
      cancelButtonTitle: "キャンセル",
      maxHeight: 300,
      maxWidth: 300,
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

  async onSubmit() {
    const { registerProfile, fetchProfile, startLoading, endLoading, addMessage, navigateConfigureIndex } = this.props;
    const { imageUri } = this.state;

    startLoading();

    try {
      await registerProfile(imageUri);
    } finally {
      endLoading();
    }

    fetchProfile();
    addMessage("プロフィール画像を更新しました。");
    navigateConfigureIndex();
  }

  render() {
    const { imageUri, initialized } = this.state;

    if (!initialized) {
      return null;
    }

    return (
      <View style={formStyle.container}>
        <View style={{ alignItems: "center", marginVertical: 40 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={this.imagePicker} style={styles.imageFrame}>
            <Image
              style={{ width: 126, height: 126 }}
              source={imageUri ? { uri: imageUri } : require("../../../../assets/images/no-avatar.png")}
            />
            <View style={styles.imageFrameText}>
              <StandardText fontSize={13} text="変更する" textStyle={{ color: colors.white }} />
            </View>
          </TouchableOpacity>
        </View>
        <FormButton title="更新する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageFrame: {
    width: 126,
    height: 126,
    borderRadius: 63,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.grayLevel5
  },
  imageFrameText: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: 0
  }
});

const mapStateToProps = (state: RootState) => ({
  currentProfile: state.currentProfile.currentProfile
});

const mapDispatchToProps = {
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage,
  fetchProfile: currentProfileAction.fetchProfile,
  registerProfile: currentProfileAction.registerProfile
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(EditProfileImage);
