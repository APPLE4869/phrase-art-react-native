import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as loadingAction from "../../../actions/loading";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";

interface Props {
  navigateConfigureIndex: () => void;
  register: any;
  startLoading: any;
  endLoading: any;
}

interface State {
}

class EditProfileImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(text: string) {
    this.setState({ username: text });
  }

  onChangePassword(text: string) {
    this.setState({ password: text });
  }

  isDisabled(): boolean {
    return true;
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateConfigureIndex } = this.props;

    startLoading();

    try {
      // 画像アップロード処理
  } finally {
      endLoading();
    }

    navigateConfigureIndex();
  }

  render() {
    return (
      <View style={formStyle.container}>
        <FormButton title="更新する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(EditProfileImage);
