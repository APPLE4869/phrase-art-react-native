import * as React from "react";
import { ActionSheetIOS, Alert, Clipboard, Platform, StyleSheet, Text, View } from "react-native";
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Message,
  MessageText,
  MessageTextProps,
  Send,
  SendProps,
  User
} from "react-native-gifted-chat";
import { connect } from "react-redux";
import * as loadingAction from "../../actions/loading";
import * as QuickbloxAction from "../../actions/quickblox";
import * as ReportsAction from "../../actions/reports";
import { colors } from "../../styles";

interface MessageWithUser {
  _id: any;
  text: string;
  createdAt: Date;
  user: {
    _id: any;
    name: string;
    avatar: string;
  };
}

interface Props {
  onSend: (messages: IMessage[]) => void;
  messages: IMessage[];
  reportSymbol: string;
  userId: undefined | string;
  startLoading: any;
  endLoading: any;
  addMessage: any;
  reportInjustice: any;
}

class Chat extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this.renderComposer = this.renderComposer.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderMessageText = this.renderMessageText.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.postReport = this.postReport.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);
  }

  // 吹き出し
  renderBubble(props: BubbleProps) {
    return (
      <View>
        {props.position === "left" && props.currentMessage ? (
          <Text style={{ color: colors.grayLevel2 }}>{(props.currentMessage as MessageWithUser).user.name}</Text>
        ) : null}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: colors.white,
              borderColor: colors.grayLevel4,
              borderWidth: 1,
              borderRadius: 20,
              borderTopLeftRadius: 3,
              padding: 7
            },
            right: {
              backgroundColor: colors.special.skyblue,
              borderRadius: 20,
              borderTopRightRadius: 3,
              padding: 7
            }
          }}
          containerToPreviousStyle={{
            left: {
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 3
            },
            right: {
              borderBottomRightRadius: 20,
              borderTopRightRadius: 3
            }
          }}
          containerToNextStyle={{
            left: {
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 3
            },
            right: {
              borderBottomRightRadius: 20,
              borderTopRightRadius: 3
            }
          }}
        />
      </View>
    );
  }

  // 送信ボタン
  renderSend(props: SendProps) {
    if (props.text && props.text.trim().length > 0) {
      return (
        <Send {...props}>
          <View
            style={{
              backgroundColor: colors.clickable,
              borderRadius: 25,
              marginBottom: 5,
              marginRight: 5,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.white,
                paddingHorizontal: 18,
                fontSize: 15,
                paddingVertical: 9,
                letterSpacing: 0.5,
                fontWeight: "bold"
              }}
            >
              送信
            </Text>
          </View>
        </Send>
      );
    }

    return (
      <View
        style={{
          backgroundColor: colors.grayLevel3,
          borderRadius: 25,
          marginBottom: 5,
          marginRight: 5,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: colors.white,
            paddingHorizontal: 18,
            fontSize: 15,
            paddingVertical: 9,
            letterSpacing: 0.5,
            fontWeight: "bold"
          }}
        >
          送信
        </Text>
      </View>
    );
  }

  // 入力エリア外枠
  renderInputToolbar(props: InputToolbarProps) {
    return <InputToolbar {...props} containerStyle={{ borderTopColor: colors.grayLevel4 }} />;
  }

  // メッセージの入力フォーム
  renderComposer(props: ComposerProps) {
    return (
      <Composer
        {...props}
        // composerHeight={60}
        placeholderTextColor={colors.grayLevel3}
        textInputStyle={{
          borderColor: colors.grayLevel4,
          borderWidth: 1,
          borderRadius: 15,
          paddingVertical: 5,
          paddingHorizontal: 15,
          marginRight: 13,
          fontSize: 13,
          lineHeight: 16
        }}
      />
    );
  }

  renderMessage(props: any) {
    return (
      <Message
        {...props}
        containerStyle={{
          left: { marginBottom: 25, alignItems: "flex-start" },
          right: { marginBottom: 25, alignItems: "flex-start" }
        }}
      />
    );
  }

  renderMessageText(props: MessageTextProps) {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: { fontSize: 13, lineHeight: 18, letterSpacing: 0.8 },
          right: { fontSize: 13, lineHeight: 18, letterSpacing: 0.8 }
        }}
      />
    );
  }

  onLongPress(context: any, message: IMessage) {
    const { reportSymbol } = this.props;

    if (message.text) {
      const options = ["コピー", "不正なコメントとして報告する", "キャンセル"];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              this.postReport(reportSymbol, message._id, "不正なコメントとして報告しました。");
              break;
          }
        }
      );
    }
  }

  onPressAvatar(user: User) {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["キャンセル", "不正ユーザーとして報告する"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this.postReport("User", user._id, "不正なユーザーとして報告しました。");
          }
        }
      );
    } else {
      Alert.alert(
        "不正ユーザーとして報告する",
        "",
        [
          { text: "いいえ", style: "cancel" },
          {
            text: "はい",
            onPress: () => {
              this.postReport("User", user._id, "不正なユーザーとして報告しました。");
            }
          }
        ],
        { cancelable: true }
      );
    }
  }

  async postReport(symbol: string, reportId: string, finishedMessage: string) {
    const { startLoading, endLoading, addMessage, reportInjustice, userId } = this.props;

    // 通知処理
    startLoading();

    try {
      await reportInjustice(userId || "", reportId, symbol);
    } catch (e) {
      endLoading();
      Alert.alert("通信に失敗しました。もう一度お試しください。");
      throw e;
    }

    endLoading();
    addMessage(finishedMessage);
  }

  render() {
    return (
      <View style={styles.chatContainer}>
        <GiftedChat
          imageStyle={{}}
          messages={this.props.messages}
          onSend={messages => this.props.onSend(messages)}
          user={{ _id: this.props.userId }}
          placeholder="コメントを入力"
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
          renderComposer={this.renderComposer}
          renderMessage={this.renderMessage}
          renderMessageText={this.renderMessageText}
          showAvatarForEveryMessage={true}
          alwaysShowSend={true}
          timeFormat="HH:mm"
          dateFormat="YYYY年MM月DD日"
          maxInputLength={500}
          onLongPress={this.onLongPress}
          onPressAvatar={this.onPressAvatar}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    width: "100%",
    minHeight: 100,
    flex: 1,
    borderTopColor: colors.grayLevel4,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 1,
    backgroundColor: colors.grayLevel5
  }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addMessage: QuickbloxAction.addMessage,
  reportInjustice: ReportsAction.reportInjustice,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Chat);
