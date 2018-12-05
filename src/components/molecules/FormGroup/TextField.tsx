import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../styles";

interface Props {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  onChangeText: (text: string) => void;
  clearTextOnFocus?: boolean;
  contextMenuHidden?: boolean;
  secureTextEntry?: boolean;
  marginTop?: 0 | 30;
  marginBottom?: 30 | 40;
  isTextarea?: boolean;
}

interface State {
  focused: boolean;
}

export default class TextField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { focused: false };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      label,
      defaultValue,
      placeholder,
      description,
      onChangeText,
      marginTop,
      marginBottom,
      clearTextOnFocus,
      contextMenuHidden,
      secureTextEntry,
      isTextarea
    } = this.props;

    const { focused } = this.state;

    return (
      <View style={[styles.form, { marginTop: marginTop || 0 }, { marginBottom: marginBottom || 30 }]}>
        <Text style={styles.formLabel}>{label}</Text>
        <TextInput
          multiline={!!isTextarea}
          numberOfLines={!!isTextarea ? 4 : 1}
          style={[
            styles.formField,
            focused ? styles.isFocused : {},
            !!isTextarea ? styles.textareaField : styles.inputTextField
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.grayLevel4}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          clearTextOnFocus={!!clearTextOnFocus}
          contextMenuHidden={!!contextMenuHidden}
          secureTextEntry={!!secureTextEntry}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoCapitalize="none"
        />
        {description ? <Text style={styles.formDescription}>{description}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: "100%"
  },
  formLabel: {
    color: colors.grayLevel2,
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 4
  },
  formField: {
    borderColor: colors.grayLevel3,
    borderWidth: 1,
    fontSize: 14,
    lineHeight: 21,
    borderRadius: 30,
    letterSpacing: 2,
    paddingHorizontal: 15,
    marginBottom: 8
  },
  inputTextField: {
    height: 45
  },
  textareaField: {
    height: 200,
    paddingTop: 15,
    paddingBottom: 15
  },
  isFocused: {
    borderColor: colors.clickable
  },
  formDescription: {
    fontSize: 11,
    color: colors.grayLevel3
  }
});
