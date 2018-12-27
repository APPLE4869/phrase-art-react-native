import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import CurrentUserDTO from "../../../models/dto/currentUserDTO";
import { State as RootState } from "../../../reducers";
import { colors, formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import StandardText from "../../atoms/StandardText";
import TextField from "../../molecules/FormGroup/TextField";

interface Props {
  currentUser?: CurrentUserDTO;
  navigateConfigureIndex: () => void;
  updateUsername: any;
  startLoading: any;
  endLoading: any;
  addMessage: any;
}

interface State {
  username: string;
}

class EditUsername extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { username: "" };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(text: string) {
    this.setState({ username: text });
  }

  isDisabled(): boolean {
    const { username } = this.state;

    if (username) {
      return false;
    }
    return true;
  }

  async onSubmit() {
    const { updateUsername, startLoading, endLoading, addMessage, navigateConfigureIndex } = this.props;
    const { username } = this.state;

    startLoading();

    try {
      await updateUsername(username);
    } finally {
      endLoading();
    }

    addMessage("ユーザー名を更新しました。");
    navigateConfigureIndex();
  }

  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return;
    }

    return (
      <View style={formStyle.container}>
        <View style={{ marginVertical: 30 }}>
          <StandardText text="現在のユーザー名" fontSize={14} textStyle={{ color: colors.grayLevel2 }} />
          <StandardText text={currentUser.username} fontSize={16} />
        </View>
        <TextField
          label="新しいユーザー名"
          onChangeText={this.onChangeUsername}
          description="半角英数字で入力してください。"
          marginBottom={40}
        />
        <FormButton title="更新する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = {
  updateUsername: authAction.updateUsername,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(EditUsername);
