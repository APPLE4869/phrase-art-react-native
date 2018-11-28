import * as React from "react";
import { Button } from "react-native";
import { NavigationParams } from "react-navigation";
import { colors } from "../../../styles";
import PhraseItemList from "../../organisms/PhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerLeft: (
        <Button onPress={() => navigation.navigate("CategoryModal")} title="カテゴリー" color={colors.clickable} />
      )
    };
  };

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
        <PhraseItemList navigateDetail={this.navigateDetail} />
      </DefaultTemplate>
    );
  }
}
