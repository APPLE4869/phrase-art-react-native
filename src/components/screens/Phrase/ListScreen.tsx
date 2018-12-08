import * as React from "react";
import { Button, Image, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { colors } from "../../../styles";
import CategoryPanelOnList from "../../organisms/CategoryPanelOnList";
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
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("UpdateRequestFormRegistrationRequest")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../assets/images/icon/plus.png")} />
        </TouchableOpacity>
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
        <View style={{ width: "100%", flex: 1 }}>
          <CategoryPanelOnList />
          <PhraseItemList navigateDetail={this.navigateDetail} />
        </View>
      </DefaultTemplate>
    );
  }
}
