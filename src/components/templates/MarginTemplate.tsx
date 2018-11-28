import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  children: JSX.Element;
}

const MarginTemplate: React.SFC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15
  }
});

export default MarginTemplate;
