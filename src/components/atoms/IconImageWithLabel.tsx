import * as React from "react";
import { Image, View } from "react-native";
import UpdateRequestDTO, { UpdateRequestType } from "../../models/dto/UpdateRequestList/UpdateRequestDTO";
import StandardText from "../atoms/StandardText";

interface Props {
  type: UpdateRequestType;
}

export default class RemainingTime extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  iconImageAndLabel(type: UpdateRequestType) {
    let imageIcon;
    let label;

    switch (type) {
      case UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE:
        imageIcon = require("../../../assets/images/icon/update-request/registration.png");
        label = "名言登録";
        break;
      case UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE:
        imageIcon = require("../../../assets/images/icon/update-request/modification.png");
        label = "名言修正";
        break;
      case UpdateRequestDTO.PHRASE_DELETION_REQUEST_TYPE:
        imageIcon = require("../../../assets/images/icon/update-request/deletion.png");
        label = "名言削除";
        break;
      default:
        imageIcon = require("../../../assets/images/icon/update-request/modification.png");
        label = "サブカテゴリー修正";
        break;
    }

    return { imageIcon, label };
  }

  render() {
    const { imageIcon, label } = this.iconImageAndLabel(this.props.type);

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={{ width: 25, height: 25 }} source={imageIcon} />
        <StandardText text={label} fontSize={12} textStyle={{ marginLeft: 8 }} />
      </View>
    );
  }
}
