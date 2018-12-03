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
  register: any;
  startLoading: any;
  endLoading: any;
}

interface State {
  disabledButton: boolean;
  username: string;
  password: string;
}

class Signup extends React.Component<Props, State> {
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
      await this.props.register(username, password);
    } finally {
      endLoading();
    }

    navigateConfigureIndex();
  }

  render() {
    const { disabledButton } = this.state;

    return (
      <View style={formStyle.container}>
        <FormGroup
          label="ユーザー名"
          placeholder="TaroYamada"
          description="半角英数字で入力してください。"
          onChangeText={this.onChangeUsername}
        />
        <FormGroup
          label="パスワード"
          onChangeText={this.onChangePassword}
          description="8文字以上で入力してください。"
          secureTextEntry={true}
          marginBottom={40}
        />
        <FormButton title="会員登録する" onPress={this.onSubmit} disabled={disabledButton} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  register: authAction.register,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Signup);
