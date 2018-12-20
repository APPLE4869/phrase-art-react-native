import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import VideoOnDemandDTO from "../../../models/dto/VideoOnDemandDTO";
import { colors } from "../../../styles";
import VideoOnDemandCheckbox, { ToggleType } from "../../atoms/Form/VideoOnDemandCheckbox";

interface Props {
  label: string;
  values: string[];
  videoOnDemands: VideoOnDemandDTO[];
  onChangeVideoOnDemandNameKeys: (videoOnDemandNameKeys: string[]) => void;
  marginTop?: 0 | 30;
  marginBottom?: 30 | 40;
}

interface State {
  focused: boolean;
}

export default class VideoOnDemandsField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { focused: false };

    this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
  }

  onToggleCheckbox(type: ToggleType, value: string) {
    const { onChangeVideoOnDemandNameKeys, values: currentNameKeys } = this.props;

    const newNameKeys = type === "Add" ? currentNameKeys.concat(value) : currentNameKeys.filter(v => v !== value);

    onChangeVideoOnDemandNameKeys(newNameKeys);
  }

  videoOnDemandBlock(videoOnDemand: VideoOnDemandDTO) {
    const { values } = this.props;

    return (
      <View style={{ width: "50%", alignItems: "center" }}>
        <VideoOnDemandCheckbox
          active={values.includes(videoOnDemand.nameKey)}
          onToggle={this.onToggleCheckbox}
          value={videoOnDemand.nameKey}
          imageUrl={videoOnDemand.imageUrl}
        />
      </View>
    );
  }

  render() {
    const { label, marginTop, marginBottom, videoOnDemands } = this.props;

    return (
      <View style={[styles.form, { marginTop: marginTop || 0 }, { marginBottom: marginBottom || 30 }]}>
        <Text style={styles.formLabel}>{label}</Text>
        <View style={styles.videoOnDemandContainer}>
          {videoOnDemands.map(videoOndemand => this.videoOnDemandBlock(videoOndemand))}
        </View>
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
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 5
  },
  videoOnDemandContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 5
  }
});
