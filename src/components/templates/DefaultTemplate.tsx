import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles";

interface Props {
  children: JSX.Element;
}

const DefaultTemplate: React.SFC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white
  }
});

export default DefaultTemplate;
