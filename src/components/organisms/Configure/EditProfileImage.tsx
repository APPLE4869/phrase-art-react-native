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
  username: string;
  password: string;
}

class EditProfileImage extends React.Component<Props, State> {
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
    return (
      <View style={formStyle.container}>
        <FormButton title="更新する" onPress={this.onSubmit} disabled={this.isDisabled()} />
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

export default enhancer(EditProfileImage);
