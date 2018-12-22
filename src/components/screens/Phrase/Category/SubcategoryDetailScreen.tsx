import * as React from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import { State as RootState } from "../../../../reducers";
import SubcategoryDetail from "../../../organisms/Category/SubcategoryDetail";
import DefaultTemplate from "../../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  auth: any;
}

class SubcategoryDetailScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    return {
      headerRight: (
        <TouchableOpacity activeOpacity={1} onPress={navigation.getParam("handleEditDialog")}>
          <Image style={{ width: 20, height: 20 }} source={require("../../../../../assets/images/icon/edit.png")} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.handleEditDialog = this.handleEditDialog.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleEditDialog: this.handleEditDialog });
  }

  handleEditDialog() {
    const { auth } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "ログインする必要があります",
        "サブカテゴリーの修正を申請するには、ログインする必要があります。\n設定からアカウントを作成してください。\n（作成は２０秒でできます。）",
        [{ text: "OK" }]
      );
      return;
    }

    this.props.navigation.navigate("SubcategoryModificationRequest");
  }

  render() {
    return (
      <DefaultTemplate>
        <SubcategoryDetail />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(SubcategoryDetailScreen);
