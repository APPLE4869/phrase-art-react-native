import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles";

interface Props {
  title: string;
  onPress: () => void;
}

export default class HeaderMenuButton extends React.Component<Props> {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { borderBottomWidth: 1, borderBottomColor: colors.clickable },
  text: { color: colors.clickable, fontSize: 16, letterSpacing: 0.8 }
});
