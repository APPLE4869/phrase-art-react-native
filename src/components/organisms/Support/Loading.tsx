import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";

interface Props {
  loading: boolean;
}

interface State {}

class Loading extends React.Component<Props, State> {
  render() {
    if (!this.props.loading) {
      return null;
    }
    return (
      <View style={styles.body}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.loading
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Loading);
