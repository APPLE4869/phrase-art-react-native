import * as React from "react";
import { NavigationParams } from "react-navigation";
import SearchWindow from "../../molecules/SearchWindow";
import SearchedPhraseItemList from "../../organisms/Phrase/SearchedPhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = () => {
    return { headerTitle: <SearchWindow /> };
  };

  constructor(props: Props) {
    super(props);

    this.navigateDetail = this.navigateDetail.bind(this);
  }

  navigateDetail(phraseId: string) {
    this.props.navigation.navigate("SearchedDetail", { phraseId });
  }

  render() {
    return (
      <DefaultTemplate>
        <SearchedPhraseItemList navigateDetail={this.navigateDetail} navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}
