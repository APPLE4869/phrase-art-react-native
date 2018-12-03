import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

interface Props {
  title: string;
  onPress: () => void;
  disabled: boolean;
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

    onPress();
  }

  render() {
    const { title, disabled } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.button, disabled ? styles.isDisabled : {}]}
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
    height: 45
  },
  isDisabled: {
    backgroundColor: colors.grayLevel3
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: "bold"
  }
});
