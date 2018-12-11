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
  login: any;
  startLoading: any;
  endLoading: any;
  addMessage: any;
}

interface State {
  username: string;
  password: string;
}

class Login extends React.Component<Props, State> {
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
    const { startLoading, endLoading, addMessage, navigateConfigureIndex } = this.props;
    const { username, password } = this.state;

    startLoading();

    try {
      await this.props.login(username, password);
    } finally {
      endLoading();
    }

    addMessage("ログインに成功しました。");
    navigateConfigureIndex();
  }

  render() {
    return (
      <View style={formStyle.container}>
        <TextField label="ユーザー名" marginTop={30} placeholder="TaroYamada" onChangeText={this.onChangeUsername} />
        <TextField label="パスワード" onChangeText={this.onChangePassword} secureTextEntry={true} marginBottom={40} />
        <FormButton title="ログインする" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login: authAction.login,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Login);
