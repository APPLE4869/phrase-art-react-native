import * as React from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import { State as RootState } from "../../../../reducers";
import { signinRequestAlert } from "../../../../support/alert";
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={navigation.getParam("handleEditDialog")}
          style={{ marginRight: Platform.OS === "android" ? 15 : 0 }}
        >
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
    const { auth, navigation } = this.props;

    if (!auth || !auth.jwt) {
      signinRequestAlert("サブカテゴリーの修正申請をする", navigation);
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
