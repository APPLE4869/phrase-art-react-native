import * as React from "react";
import { NavigationParams } from "react-navigation";
import UpdateRequestDTO, { UpdateRequestType } from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import DeletionRequestDetail from "../../organisms/UpdateRequest/PhraseDeletionRequestDetail";
import ModificationRequestDetail from "../../organisms/UpdateRequest/PhraseModificationRequestDetail";
import RegistrationRequestDetail from "../../organisms/UpdateRequest/PhraseRegistrationRequestDetail";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseUpdateRequest extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    const updateRequestType: UpdateRequestType = navigation.getParam("updateRequestType");

    let title = null;
    switch (updateRequestType) {
      case UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE:
        title = "名言登録申請";
        break;
      case UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE:
        title = "名言修正申請";
        break;
      default:
        title = "名言削除申請";
    }
    return { title };
  };
  private updateRequestId: string;
  private updateRequestType: UpdateRequestType;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.updateRequestId = navigation.getParam("updateRequestId");
    this.updateRequestType = navigation.getParam("updateRequestType");
  }

  render() {
    switch (this.updateRequestType) {
      case UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE:
        return (
          <DefaultTemplate>
            <RegistrationRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
      case UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE:
        return (
          <DefaultTemplate>
            <ModificationRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
      default:
        return (
          <DefaultTemplate>
            <DeletionRequestDetail updateRequestId={this.updateRequestId} />
          </DefaultTemplate>
        );
    }
  }
}
