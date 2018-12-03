import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import * as authAction from "../../../actions/auth";
import { State as RootState } from "../../../reducers";
import ConfigureIndexItem from "../../molecules/ConfigureIndexItem";

interface Props {
  navigation: NavigationParams;
  auth: any;
  logout: any;
}

interface State {}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation, auth } = this.props;

    // ログイン中
    if (auth && auth.jwt) {
      // TODO : ログアウトはConfirmをつける予定
      return (
        <View style={styles.container}>
          <ConfigureIndexItem title="ログアウト" onPress={() => this.props.logout()} hiddenRightArrow={true} />
        </View>
      );
    }

    // 未ログイン
    return (
      <View style={styles.container}>
        <ConfigureIndexItem title="ログイン" onPress={() => navigation.navigate("ConfigureLogin")} />
        <ConfigureIndexItem title="会員登録" onPress={() => navigation.navigate("ConfigureSignup")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout: authAction.logout
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Index);
