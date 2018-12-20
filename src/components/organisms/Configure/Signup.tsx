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
  register: any;
  startLoading: any;
  endLoading: any;
  addMessage: any;
}

interface State {
  username: string;
  password: string;
}

class Signup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { username: "", password: "" };

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
    const { username, password } = this.state;

    if (username && password) {
      return false;
    }
    return true;
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateConfigureIndex, addMessage } = this.props;
    const { username, password } = this.state;

    startLoading();

    try {
      await this.props.register(username, password);
    } finally {
      endLoading();
    }

    addMessage("アカウントの作成に成功しました。");
    navigateConfigureIndex();
  }

  render() {
    return (
      <View style={formStyle.container}>
        <TextField
          marginTop={30}
          label="ユーザー名"
          placeholder="TaroYamada"
          description="半角英数字で入力してください。"
          onChangeText={this.onChangeUsername}
        />
        <TextField
          label="パスワード"
          onChangeText={this.onChangePassword}
          description="8文字以上で入力してください。"
          secureTextEntry={true}
          marginBottom={40}
        />
        <FormButton title="アカウントを作成する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  register: authAction.register,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Signup);
