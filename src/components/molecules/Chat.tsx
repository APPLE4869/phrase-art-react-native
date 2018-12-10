import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
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
  MessageProps,
  MessageText,
  MessageTextProps,
  Send,
  SendProps
} from "react-native-gifted-chat";
import { colors } from "../../styles";

interface Props {
  onSend: (messages: IMessage[]) => void;
  messages: IMessage[];
  userId: string;
}

export default class Chat extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this.renderComposer = this.renderComposer.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderMessageText = this.renderMessageText.bind(this);
  }

  // 吹き出し
  renderBubble(props: BubbleProps) {
    return (
      <View>
        {props.position === "left" ? (
          <Text style={{ color: colors.grayLevel2 }}>{props.currentMessage.user.name}</Text>
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
            <Text style={{ color: colors.white, paddingHorizontal: 18, lineHeight: 32, fontWeight: "bold" }}>送信</Text>
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
        <Text style={{ color: colors.white, paddingHorizontal: 18, lineHeight: 32, fontWeight: "bold" }}>送信</Text>
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
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginRight: 13,
          fontSize: 12,
          lineHeight: 15
        }}
      />
    );
  }

  renderMessage(props: MessageProps) {
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
          left: { fontSize: 12, lineHeight: 18, letterSpacing: 0.8 },
          right: { fontSize: 12, lineHeight: 18, letterSpacing: 0.8 }
        }}
      />
    );
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
