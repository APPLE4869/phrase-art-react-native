import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { NavigationParams } from "react-navigation";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { colors } from "../../../styles";
import SearchWindow from "../../molecules/SearchWindow";

interface Props {
  navigation: NavigationParams;
  auth: any;
  phrasesListStatus: PhrasesListStatus;
}

export default class PhraseListScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    const onPressForRight = navigation.getParam("onPressForRight");
    const onNavigateAfterSearch = navigation.getParam("onNavigateAfterSearch");

    return {
      headerTitle: <SearchWindow onNavigateAfterSearch={onNavigateAfterSearch} />,
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={onPressForRight}>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
            source={require("../../../../assets/images/icon/star.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.onNavigateAfterSearch = this.onNavigateAfterSearch.bind(this);
    this.navigateFavoriteList = this.navigateFavoriteList.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ onNavigateAfterSearch: this.onNavigateAfterSearch });
    navigation.setParams({ onPressForRight: this.navigateFavoriteList });
  }

  onNavigateAfterSearch() {
    this.props.navigation.navigate("SearchedList");
  }

  navigateFavoriteList() {
    this.props.navigation.navigate("FavoriteList");
  }

  render() {
    return <View style={{ flex: 1, width: "100%", backgroundColor: colors.white }} />;
  }
}
