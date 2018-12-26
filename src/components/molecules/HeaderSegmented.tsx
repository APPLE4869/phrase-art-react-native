import * as React from "react";
import { Platform, SegmentedControlIOS, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  onChangeIndex: (index: number) => void;
  values: string[];
  selectedIndex?: number;
}

export default class HeaderSegmented extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeForIOS = this.onChangeForIOS.bind(this);
  }

  isActive(index: number) {
    const { selectedIndex } = this.props;

    if (index === 0 && !selectedIndex) {
      return true;
    } else if (index === selectedIndex) {
      return true;
    } else {
      return false;
    }
  }

  onChangeForIOS(event: any) {
    const { selectedSegmentIndex } = event.nativeEvent;
    const { onChangeIndex } = this.props;
    onChangeIndex(selectedSegmentIndex);
  }

  render() {
    const { values, selectedIndex, onChangeIndex } = this.props;

    return Platform.OS === "ios" ? (
      <View style={iosStyles.container}>
        <SegmentedControlIOS values={values} onChange={this.onChangeForIOS} selectedIndex={selectedIndex || 0} />
      </View>
    ) : (
      <View style={androidStyles.container}>
        {values.map((value, i) => (
          <TouchableOpacity
            onPress={() => {
              onChangeIndex(i);
            }}
            activeOpacity={1}
            style={[androidStyles.option, this.isActive(i) ? androidStyles.activeOption : androidStyles.disableOption]}
          >
            <Text
              style={[
                androidStyles.optionText,
                this.isActive(i) ? androidStyles.activeOptionText : androidStyles.disableOptionText
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const iosStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.special.navigationBarBackground,
    paddingHorizontal: "8%",
    paddingVertical: 15
  }
});

const androidStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row"
  },
  option: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15
  },
  optionText: {
    fontSize: 14,
    letterSpacing: 1
  },
  activeOption: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: colors.clickable,
    borderWidth: 1
  },
  disableOption: {
    borderColor: "transparent",
    borderWidth: 1
  },
  activeOptionText: {
    color: colors.clickable,
    fontWeight: "bold"
  },
  disableOptionText: {
    color: colors.grayLevel3
  }
});
