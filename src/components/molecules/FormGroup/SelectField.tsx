import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import PickerSelect from "react-native-picker-select";
import { colors } from "../../../styles";

interface Props {
  label: string;
  defaultValue?: string;
  description?: string;
  items: Array<{ value: string | number; label: string }>;
  onChangeValue: (text: string) => void;
  marginTop?: 0 | 30;
  marginBottom?: 30 | 40;
}

export default class SelectField extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label, defaultValue, description, items, onChangeValue, marginTop, marginBottom } = this.props;

    return (
      <View style={[styles.form, { marginTop: marginTop || 0 }, { marginBottom: marginBottom || 30 }]}>
        <Text style={styles.formLabel}>{label}</Text>
        {Platform.OS === "ios" ? (
          <PickerSelect
            placeholder={{ label: "選択してください" }}
            style={{ ...pickerSelectStyles }}
            items={items}
            onValueChange={onChangeValue}
            value={defaultValue}
            doneText="確定"
          />
        ) : (
          <View style={[pickerSelectStyles.pickerAndroid]}>
            <PickerSelect
              placeholder={{ label: "選択してください" }}
              style={{ ...pickerSelectStyles }}
              items={items}
              onValueChange={onChangeValue}
              value={defaultValue}
            />
          </View>
        )}
        {description ? <Text style={styles.formDescription}>{description}</Text> : null}
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    paddingHorizontal: 15,
    fontSize: 15,
    letterSpacing: 2,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.grayLevel3,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    color: colors.baseBlack
  },
  inputAndroid: {
    height: 45,
    fontSize: 15
  },
  pickerAndroid: {
    height: 45,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.grayLevel3,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    color: colors.baseBlack
  },
  icon: {
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    top: 22
  },
  done: {
    fontSize: 18,
    fontWeight: "normal",
    paddingTop: 14
  },
  underline: {
    width: 0
  }
});

const styles = StyleSheet.create({
  form: {
    width: "100%"
  },
  formLabel: {
    color: colors.grayLevel2,
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 5
  },
  formDescription: {
    fontSize: 12,
    color: colors.grayLevel3
  }
});
