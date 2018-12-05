import * as React from "react";
import { Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as loadingAction from "../../../actions/loading";
import * as registrationRequestAction from "../../../actions/UpdateRequest/registrationRequest";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import { State as RootState } from "../../../reducers";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import SelectField from "../../molecules/FormGroup/SelectField";
import TextField from "../../molecules/FormGroup/TextField";

interface Props {
  navigateNextScreen: () => void;
  navigateBack: () => void;
  categories: CategoryDTO[];
  fetchCategories: any;
  startLoading: any;
  endLoading: any;
  submitRegisterRequest: any;
  initializeCategories: any;
  auth: any;
}

interface State {
  categoryId: string;
  subcategoryName: string;
  author: string;
  content: string;
  disabledButton: boolean;
}

class RegistrationRequestScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.verifyAuth();

    this.state = { categoryId: "", subcategoryName: "", author: "", content: "", disabledButton: true };

    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.fetchCategoriesAndsetInitialCategoryId();
  }

  verifyAuth() {
    const { auth, navigateBack } = this.props;

    if (!auth || !auth.jwt) {
      Alert.alert(
        "会員登録が必要です",
        "名言の登録を申請するには、会員登録が必要です。\n設定から会員登録を行ってください。",
        [{ text: "OK", onPress: navigateBack }]
      );
    }
  }

  async fetchCategoriesAndsetInitialCategoryId() {
    const { fetchCategories } = this.props;

    if (this.props.categories.length === 0) {
      // 初期表示用のカテゴリーを取得
      await fetchCategories();
    }

    this.state = { ...this.state, categoryId: this.props.categories[0].id };
  }

  onChangeCategoryId(categoryId: string) {
    this.setState({ categoryId });
    this.updateDisabledButtonStatus();
  }

  onChangeSubcategoryName(subcategoryName: string) {
    this.setState({ subcategoryName });
    this.updateDisabledButtonStatus();
  }

  onChangeAuthor(author: string) {
    this.setState({ author });
    this.updateDisabledButtonStatus();
  }

  onChangeContent(content: string) {
    this.setState({ content });
    this.updateDisabledButtonStatus();
  }

  categoryItems() {
    const { categories } = this.props;
    if (categories.length === 0) {
      return [];
    }
    return categories.map(category => {
      return { label: category.name, value: category.id };
    });
  }

  updateDisabledButtonStatus() {
    const { subcategoryName, author, content } = this.state;

    if (subcategoryName && author && content) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateNextScreen, submitRegisterRequest } = this.props;
    const { categoryId, subcategoryName, author, content } = this.state;
    startLoading();

    try {
      await submitRegisterRequest(categoryId, subcategoryName, author, content);
    } finally {
      endLoading();
    }

    navigateNextScreen();
  }

  render() {
    const { categoryId, subcategoryName, author, content, disabledButton } = this.state;
    const { categories } = this.props;

    if (categories.length === 0) {
      return null;
    }

    return (
      <ScrollView style={formStyle.container}>
        <SelectField
          label="カテゴリー"
          marginTop={30}
          items={this.categoryItems()}
          onChangeValue={this.onChangeCategoryId}
          defaultValue={categoryId}
        />
        <TextField
          label="サブカテゴリー"
          placeholder="経営者"
          onChangeText={this.onChangeSubcategoryName}
          defaultValue={subcategoryName}
        />
        <TextField
          label="作者"
          placeholder="スティーブ・ジョブズ"
          description="スペースは入力できません。"
          onChangeText={this.onChangeAuthor}
          defaultValue={author}
        />
        <TextField
          label="内容"
          placeholder="「自分なら世界を変える事が出来る」 そんなことを本気で信じた人達が、この世界を変えてきたのだ。"
          onChangeText={this.onChangeContent}
          marginBottom={40}
          defaultValue={content}
          isTextarea={true}
        />
        <FormButton title="登録申請する" onPress={this.onSubmit} disabled={disabledButton} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  auth: state.auth
});

const mapDispatchToProps = {
  fetchCategories: CategoriesAction.fetchCategories,
  initializeCategories: CategoriesAction.initializeCategories,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  submitRegisterRequest: registrationRequestAction.submitRegisterRequest
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(RegistrationRequestScreen);
