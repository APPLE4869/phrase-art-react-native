import * as React from "react";
import { Keyboard } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as freeChatCommentAction from "../../../actions/freeChatComment";
import FreeChatCommentDTO from "../../../models/dto/FreeChatCommentDTO";
import { State as RootState } from "../../../reducers";
import { signinRequestAlert } from "../../../support/alert";
import Chat from "../../molecules/Chat";

interface Props {
  navigation: NavigationParams;
  auth: any;
  comments: FreeChatCommentDTO[];
  submitComment: any;
  fetchPreviousFreeChatComments: any;
  fetchFollowingFreeChatComments: any;
  initializeFreeChatComments: any;
}

interface State {}

class Chatting extends React.Component<Props, State> {
  private firstFetchCommentId?: string;
  constructor(props: Props) {
    super(props);

    this.onSendComment = this.onSendComment.bind(this);

    this.initializeComments();
  }

  async initializeComments() {
    const { fetchPreviousFreeChatComments, initializeFreeChatComments } = this.props;

    initializeFreeChatComments();

    await fetchPreviousFreeChatComments();

    if (this.props.comments.length > 0) {
      this.firstFetchCommentId = this.props.comments[0].id;
    }
  }

  async onSendComment(messages: IMessage[]) {
    Keyboard.dismiss();

    const { auth, submitComment, comments, fetchFollowingFreeChatComments } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("メッセージをする", this.props.navigation);
      return;
    }

    await submitComment(messages[0].text.trim());

    if (comments.length > 0) {
      fetchFollowingFreeChatComments(comments[0].id);
      return;
    }

    await this.props.fetchPreviousFreeChatComments();

    if (this.props.comments.length > 0 && !this.firstFetchCommentId) {
      this.firstFetchCommentId = this.props.comments[0].id;
    }
  }

  render() {
    const { auth, comments } = this.props;
    const { currentUser } = auth;

    return (
      <Chat
        onSend={this.onSendComment}
        comments={comments}
        userId={currentUser ? currentUser.id : undefined}
        reportSymbol="Chatting"
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  comments: state.freeChatComment.freeChatComments
});

const mapDispatchToProps = {
  submitComment: freeChatCommentAction.submitComment,
  fetchPreviousFreeChatComments: freeChatCommentAction.fetchPreviousFreeChatComments,
  fetchFollowingFreeChatComments: freeChatCommentAction.fetchFollowingFreeChatComments,
  initializeFreeChatComments: freeChatCommentAction.initializeFreeChatComments
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Chatting);
