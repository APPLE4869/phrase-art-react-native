import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  onChangeText: (text: string) => void;
  clearTextOnFocus?: boolean;
  contextMenuHidden?: boolean;
  secureTextEntry?: boolean;
  marginBottom?: 30 | 40;
}

interface State {
  focused: boolean;
}

export default class FormGroup extends React.Component<Props, State> {
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
      marginBottom,
      clearTextOnFocus,
      contextMenuHidden,
      secureTextEntry
    } = this.props;

    const { focused } = this.state;

    return (
      <View style={[styles.form, { marginBottom: marginBottom || 30 }]}>
        <Text style={styles.formLabel}>{label}</Text>
        <TextInput
          style={[styles.formField, focused ? styles.isFocused : {}]}
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
    height: 45,
    borderColor: colors.grayLevel3,
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 30,
    letterSpacing: 2,
    paddingHorizontal: 15,
    marginBottom: 8
  },
  isFocused: {
    borderColor: colors.clickable
  },
  formDescription: {
    fontSize: 11,
    color: colors.grayLevel3
  }
});
