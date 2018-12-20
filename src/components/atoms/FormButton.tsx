import * as React from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  dangerColor?: true;
}

export default class FormButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onTouch = this.onTouch.bind(this);
  }

  onTouch() {
    const { onPress, disabled } = this.props;

    if (disabled) {
      return;
    }

    Keyboard.dismiss();

    onPress();
  }

  render() {
    const { title, disabled, dangerColor } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.button, dangerColor ? styles.isDangerButton : {}, disabled ? styles.isDisabled : {}]}
        onPress={this.onTouch}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.clickable,
    borderRadius: 30,
    height: 45,
    marginBottom: 30
  },
  isDisabled: {
    backgroundColor: colors.grayLevel3
  },
  buttonText: {
    fontSize: 15,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: "bold"
  },
  isDangerButton: {
    backgroundColor: colors.danger
  }
});
