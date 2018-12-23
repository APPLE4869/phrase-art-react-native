import * as React from "react";
import { Animated, Image, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import * as QuickbloxAction from "../../actions/quickblox";
import { State as RootState } from "../../reducers";
import { colors } from "../../styles";

interface Props {
  quickblox: any;
  clearMessage: any;
}

interface State {
  bounceValue: AnimatedValue;
}

class Quickblox extends React.Component<Props, State> {
  private initialPosition = -70;
  private showPosition = -10;
  private finalPosition = -100;

  constructor(props: Props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(this.initialPosition)
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.quickblox.message && this.props.quickblox.message) {
      setTimeout(() => {
        this.show();
      }, 300);
      setTimeout(() => {
        this.hide();
        setTimeout(() => {
          this.props.clearMessage();
        }, 4500);
      }, 2500);
    }
  }

  show() {
    const toValue = this.showPosition;
    this.animate(toValue);
  }

  hide() {
    const toValue = this.finalPosition;
    this.animate(toValue);
  }

  animate(toValue: number) {
    Animated.spring(this.state.bounceValue, {
      toValue,
      velocity: 4
    }).start();
  }

  render() {
    const { message } = this.props.quickblox;

    if (!message) {
      return null;
    }

    return (
      <Animated.View style={[styles.container, { transform: [{ translateY: this.state.bounceValue }] }]}>
        <Image style={{ width: 20, height: 20 }} source={require("../../../assets/images/icon/check-circle.png")} />
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.special.successGreen,
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    zIndex: 3000,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 21,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: "bold"
  }
});

const mapStateToProps = (state: RootState) => ({
  quickblox: state.quickblox
});

const mapDispatchToProps = {
  clearMessage: QuickbloxAction.clearMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(Quickblox);
