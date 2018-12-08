import * as React from "react";
import { SegmentedControlIOS, StyleSheet, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  onChange: (event: any) => void;
  values: string[];
  selectedIndex?: number;
}

export default class HeaderSegmentedControlIOS extends React.Component<Props> {
  render() {
    const { onChange, values, selectedIndex } = this.props;

    return (
      <View style={styles.container}>
        <SegmentedControlIOS values={values} onChange={onChange} selectedIndex={selectedIndex || 0} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.special.navigationBarBackground,
    paddingHorizontal: "8%",
    paddingVertical: 15
  }
});
