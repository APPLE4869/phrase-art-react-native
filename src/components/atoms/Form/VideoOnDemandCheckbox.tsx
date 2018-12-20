import * as React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onToggle: (type: ToggleType, value: string) => void;
  active: boolean;
  value: string;
  imageUrl: string;
}

export type ToggleType = "Add" | "Remove";

export default class VideoOnDemandCheckbox extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { onToggle, active, value } = this.props;

    if (active) {
      onToggle("Remove", value);
    } else {
      onToggle("Add", value);
    }
  }

  render() {
    const { active, imageUrl } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={{ alignItems: "center" }}>
        <Image style={active ? styles.activeImg : styles.inactiveImg} source={{ uri: imageUrl }} />
        {active ? (
          <Image style={styles.activeBox} source={require("../../../../assets/images/icon/form/checkbox-active.png")} />
        ) : (
          <Image
            style={styles.inactiveBox}
            source={require("../../../../assets/images/icon/form/checkbox-inactive.png")}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  activeImg: {
    width: 95,
    height: 95
  },
  inactiveImg: {
    width: 95,
    height: 95,
    opacity: 0.5
  },
  activeBox: {
    width: 26,
    height: 29,
    left: 3
  },
  inactiveBox: {
    width: 22,
    height: 22,
    marginTop: 7
  }
});
