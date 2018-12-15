import * as React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../styles";

interface Props {
  isVisible: boolean;
  children: JSX.Element;
  height: 300 | 350 | 400 | 450 | 500;
  closeAction: () => void;
}

const DefaultModal: React.SFC<Props> = ({ isVisible, children, height, closeAction }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropOpacity={0.2}
      onBackdropPress={closeAction}
    >
      <View style={[styles.cassette, { height }]}>
        <ScrollView style={styles.cassetteContent}>{children}</ScrollView>
        <Button title="閉じる" onPress={closeAction} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.3
  },
  cassette: {
    backgroundColor: colors.white,
    width: "97%",
    borderRadius: 15,
    padding: 20
  },
  cassetteContent: {
    flex: 1,
    marginBottom: 10
  }
});

export default DefaultModal;
