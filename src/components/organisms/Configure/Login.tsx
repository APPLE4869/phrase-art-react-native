import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as loadingAction from "../../../actions/loading";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import FormGroup from "../../molecules/FormGroup";

interface Props {
  navigateConfigureIndex: () => void;
  login: any;
  startLoading: any;
  endLoading: any;
}

interface State {
  disabledButton: boolean;
  username: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { disabledButton: true, username: "", password: "" };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(text: string) {
    this.setState({ username: text });
    this.updateDisabledButtonStatus();
  }

  onChangePassword(text: string) {
    this.setState({ password: text });
    this.updateDisabledButtonStatus();
  }

  updateDisabledButtonStatus() {
    const { username, password } = this.state;

    if (username && password) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateConfigureIndex } = this.props;
    const { username, password } = this.state;

    startLoading();

    try {
      await this.props.login(username, password);
    } finally {
      endLoading();
    }

    navigateConfigureIndex();
  }

  render() {
    const { disabledButton } = this.state;

    return (
      <View style={formStyle.container}>
        <FormGroup label="ユーザー名" placeholder="TaroYamada" onChangeText={this.onChangeUsername} />
        <FormGroup label="パスワード" onChangeText={this.onChangePassword} secureTextEntry={true} marginBottom={40} />
        <FormButton title="ログインする" onPress={this.onSubmit} disabled={disabledButton} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login: authAction.login,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Login);
