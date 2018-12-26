import * as React from "react";
import { Platform, View } from "react-native";
import { NavigationParams } from "react-navigation";
import SearchWindow from "../../molecules/SearchWindow";
import SearchedPhraseItemList from "../../organisms/Phrase/SearchedPhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = () => {
    return {
      headerTitle: (
        <View style={{ flexDirection: "row", flex: 1, marginRight: Platform.OS === "android" ? 15 : 0 }}>
          <SearchWindow />
        </View>
      )
    };
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
