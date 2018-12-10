import * as React from "react";
import { Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as loadingAction from "../../../actions/loading";
import * as phraseDeletionRequestAction from "../../../actions/UpdateRequest/phraseDeletionRequest";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import TextContentWithLabel from "../../molecules/TextContentWithLabel";

interface Props {
  phrase: PhraseDTO;
  navigateNextScreen: () => void;
  startLoading: any;
  endLoading: any;
  submitPhraseDeletionRequest: any;
}

class DeletionForm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPress() {
    Alert.alert("本当に削除を申請しても\nよろしいですか？", undefined, [
      { text: "削除を申請する", onPress: this.onSubmit },
      { text: "キャンセル", style: "cancel" }
    ]);
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateNextScreen, submitPhraseDeletionRequest, phrase } = this.props;
    startLoading();

    try {
      await submitPhraseDeletionRequest(phrase.id);
    } finally {
      endLoading();
    }

    navigateNextScreen();
  }

  render() {
    const { categoryName, subcategoryName, content, authorName } = this.props.phrase;

    return (
      <ScrollView style={formStyle.container}>
        <TextContentWithLabel label="カテゴリー" content={categoryName} marginTop={30} />
        <TextContentWithLabel label="サブカテゴリー" content={subcategoryName || "未登録"} />
        <TextContentWithLabel label="作者" content={authorName} />
        <TextContentWithLabel label="内容" content={content} />
        <FormButton title="削除申請する" onPress={this.onPress} dangerColor={true} />
      </ScrollView>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  submitPhraseDeletionRequest: phraseDeletionRequestAction.submitPhraseDeletionRequest
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(DeletionForm);