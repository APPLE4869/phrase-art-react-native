import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  positiveTitle: string;
  negativeTitle: string;
  onPressForPositive: () => void;
  onPressForNegative: () => void;
  activeIndex?: 0 | 1;
  isDisabled?: boolean;
  marginTop?: number;
  marginBottom?: number;
}

export default class ChoiceButtonGroup extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onTouchForPositive = this.onTouchForPositive.bind(this);
    this.onTouchForNegative = this.onTouchForNegative.bind(this);
  }

  onTouchForPositive() {
    const { onPressForPositive, activeIndex, isDisabled } = this.props;

    if (activeIndex === 0 || !!isDisabled) {
      return;
    }

    onPressForPositive();
  }

  onTouchForNegative() {
    const { onPressForNegative, activeIndex, isDisabled } = this.props;

    if (activeIndex === 1 || !!isDisabled) {
      return;
    }

    onPressForNegative();
  }

  isPositive() {
    return this.props.activeIndex === 0;
  }

  isNegative() {
    return this.props.activeIndex === 1;
  }

  customMarginVertical() {
    const { marginTop, marginBottom } = this.props;
    return { marginTop: marginTop || 0, marginBottom: marginBottom || 0 };
  }

  render() {
    const { positiveTitle, negativeTitle, isDisabled } = this.props;

    return (
      <View style={[styles.container, this.customMarginVertical(), !!isDisabled ? { opacity: 0.55 } : {}]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, styles.positiveButton, this.isPositive() ? styles.isPositiveActive : {}]}
          onPress={this.onTouchForPositive}
        >
          <Text style={[styles.buttonText, this.isPositive() ? styles.isPositiveActiveText : {}]}>{positiveTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.button, styles.negativeButton, this.isNegative() ? styles.isNegativeActive : {}]}
          onPress={this.onTouchForNegative}
        >
          <Text style={[styles.buttonText, this.isNegative() ? styles.isNegativeActiveText : {}]}>{negativeTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    borderRadius: 30,
    height: 40
  },
  positiveButton: {
    backgroundColor: colors.special.approve,
    borderWidth: 1,
    borderColor: colors.special.approve,
    marginRight: 25
  },
  negativeButton: {
    backgroundColor: colors.special.reject,
    borderWidth: 1,
    borderColor: colors.special.reject
  },
  isPositiveActive: {
    backgroundColor: colors.white
  },
  isNegativeActive: {
    backgroundColor: colors.white
  },
  buttonText: {
    fontSize: 15,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: "bold"
  },
  isPositiveActiveText: {
    color: colors.special.approve
  },
  isNegativeActiveText: {
    color: colors.special.reject
  }
});
