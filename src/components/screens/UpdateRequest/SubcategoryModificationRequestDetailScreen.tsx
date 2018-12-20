import * as React from "react";
import { NavigationParams } from "react-navigation";
import SubcategoryModificationRequestDetail from "../../organisms/UpdateRequest/SubcategoryModificationRequestDetail";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseUpdateRequest extends React.Component<Props> {
  private updateRequestId: string;

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    this.updateRequestId = navigation.getParam("updateRequestId");
  }

  render() {
    return (
      <DefaultTemplate>
        <SubcategoryModificationRequestDetail updateRequestId={this.updateRequestId} />
      </DefaultTemplate>
    );
  }
}
