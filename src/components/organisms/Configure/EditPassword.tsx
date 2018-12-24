import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import TextField from "../../molecules/FormGroup/TextField";

interface Props {
  navigateConfigureIndex: () => void;
  updatePassword: any;
  startLoading: any;
  endLoading: any;
  addMessage: any;
}

interface State {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

class EditPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { currentPassword: "", newPassword: "", confirmNewPassword: "" };

    this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeCurrentPassword(currentPassword: string) {
    this.setState({ currentPassword });
  }

  onChangeNewPassword(newPassword: string) {
    this.setState({ newPassword });
  }

  onChangeConfirmNewPassword(confirmNewPassword: string) {
    this.setState({ confirmNewPassword });
  }

  isDisabled(): boolean {
    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    if (currentPassword && newPassword && confirmNewPassword) {
      return false;
    }
    return true;
  }

  async onSubmit() {
    const { updatePassword, startLoading, endLoading, addMessage, navigateConfigureIndex } = this.props;
    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    startLoading();

    try {
      await updatePassword(currentPassword, newPassword, confirmNewPassword);
    } finally {
      endLoading();
    }

    addMessage("ログインに成功しました。");
    navigateConfigureIndex();
  }

  render() {
    return (
      <View style={formStyle.container}>
        <TextField
          label="現在のパスワード"
          onChangeText={this.onChangeCurrentPassword}
          secureTextEntry={true}
          marginTop={30}
        />
        <TextField
          label="新しいパスワード"
          onChangeText={this.onChangeNewPassword}
          description="8文字以上で入力してください。"
          secureTextEntry={true}
          marginBottom={30}
        />
        <TextField
          label="新しいパスワード（確認用）"
          onChangeText={this.onChangeConfirmNewPassword}
          secureTextEntry={true}
          marginBottom={40}
        />
        <FormButton title="更新する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updatePassword: authAction.updatePassword,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(EditPassword);
