import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../styles";
import TextField from "../TextField";

interface Props {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeText: (text: string, isCandidate?: boolean) => void;
  marginTop?: 0 | 30;
  marginBottom?: 30 | 40;
  candidates: Array<{ label: string; value: string }>;
  description?: string;
}

interface State {}

export default class TextFieldWithCandidates extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onPressCandidate = this.onPressCandidate.bind(this);
  }

  onPressCandidate(label: string) {
    const { onChangeText } = this.props;
    onChangeText(label, true);
  }

  render() {
    const {
      label,
      candidates,
      defaultValue,
      placeholder,
      onChangeText,
      description,
      marginTop,
      marginBottom
    } = this.props;

    return (
      <View style={[styles.form, { marginBottom: marginBottom || 30 }]}>
        <TextField
          label={label}
          placeholder={placeholder}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          marginTop={marginTop}
          marginBottom={0}
          description={description}
        />
        {candidates.length > 0 ? (
          <View style={{ marginTop: description ? 5 : 0 }}>
            <Text style={{ color: colors.grayLevel1, fontSize: 14, marginBottom: 5 }}>もしかして？</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {candidates.map(candidate => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={() => {
                    this.onPressCandidate(candidate.label);
                  }}
                >
                  <Text style={{ color: colors.clickable, fontSize: 13, lineHeight: 21 }}>{candidate.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: "100%"
  },
  flatList: {
    bottom: 7,
    width: "100%",
    maxHeight: 300,
    paddingHorizontal: 16,
    borderColor: colors.grayLevel3,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999
  },
  list: {
    height: 39,
    justifyContent: "center"
  },
  itemList: {
    height: 39,
    justifyContent: "center"
  }
});
