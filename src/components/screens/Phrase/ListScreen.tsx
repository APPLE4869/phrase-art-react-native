import * as React from "react";
import { NavigationParams } from "react-navigation";
import ItemList from "../../organisms/ItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseListScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateDetail = this.navigateDetail.bind(this);
  }

  navigateDetail(phraseId: string) {
    this.props.navigation.navigate("PhraseDetail", { phraseId });
  }

  render() {
    return (
      <DefaultTemplate>
        <ItemList navigateDetail={this.navigateDetail} />
      </DefaultTemplate>
    );
  }
}
