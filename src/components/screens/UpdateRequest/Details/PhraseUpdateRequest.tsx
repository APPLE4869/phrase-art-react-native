import * as React from "react";
import { NavigationParams } from "react-navigation";
import { PhraseUpdateRequestType } from "../../../../models/dto/UpdateRequest/UpdateRequestDTO";
import RegistrationRequestDetail from "../../../organisms/UpdateRequest/RegistrationRequestDetail";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseUpdateRequest extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    const type: PhraseUpdateRequestType = navigation.getParam("type");

    let title = null;
    switch (type) {
      case "PhraseRegistrationRequest":
        title = "名言登録申請";
        break;
      case "PhraseModificationRequest":
        title = "名言修正申請";
        break;
      default:
        title = "名言削除申請";
    }
    return { title };
  };
  private updateRequestId: string;
  private type: PhraseUpdateRequestType;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.updateRequestId = navigation.getParam("updateRequestId");
    this.type = navigation.getParam("type");
  }

  render() {
    switch (this.type) {
      case "PhraseRegistrationRequest":
        return (
          <DefaultTemplate>
            <RegistrationRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
      case "PhraseModificationRequest":
        return (
          <DefaultTemplate>
            <RegistrationRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
      case "PhraseDeletionRequest":
        return (
          <DefaultTemplate>
            <RegistrationRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
    }
  }
}
