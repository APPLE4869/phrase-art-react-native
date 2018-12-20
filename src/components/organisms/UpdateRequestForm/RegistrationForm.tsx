import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import * as registrationRequestAction from "../../../actions/UpdateRequest/phraseRegistrationRequest";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import { State as RootState } from "../../../reducers";
import { formStyle } from "../../../styles";
import FormButton from "../../atoms/FormButton";
import SelectField from "../../molecules/FormGroup/SelectField";
import TextField from "../../molecules/FormGroup/TextField";

interface Props {
  navigateNextScreen: () => void;
  categories: CategoryDTO[];
  fetchCategories: any;
  startLoading: any;
  endLoading: any;
  submitRegisterRequest: any;
  initializeCategories: any;
  addMessage: any;
}

interface State {
  categoryId: string;
  subcategoryName: string;
  author: string;
  content: string;
}

class RegistrationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { categoryId: "", subcategoryName: "", author: "", content: "" };

    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.fetchCategoriesAndsetInitialCategoryId();
  }

  async fetchCategoriesAndsetInitialCategoryId() {
    const { fetchCategories } = this.props;

    // 初期表示用のカテゴリーを取得
    await fetchCategories();

    const { categories } = this.props;
    if (categories.length > 0) {
      this.setState({ categoryId: categories[0].id });
    }
  }

  onChangeCategoryId(categoryId: string) {
    this.setState({ categoryId });
  }

  onChangeSubcategoryName(subcategoryName: string) {
    this.setState({ subcategoryName });
  }

  onChangeAuthor(author: string) {
    this.setState({ author });
  }

  onChangeContent(content: string) {
    this.setState({ content });
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

  isDisabled(): boolean {
    const { subcategoryName, author, content } = this.state;

    if (subcategoryName && author && content) {
      return false;
    }

    return true;
  }

  async onSubmit() {
    const { startLoading, endLoading, navigateNextScreen, submitRegisterRequest, addMessage } = this.props;
    const { categoryId, subcategoryName, content, author } = this.state;
    startLoading();

    try {
      await submitRegisterRequest(categoryId, subcategoryName, content, author);
    } finally {
      endLoading();
    }

    addMessage("名言の登録申請に成功しました。");
    navigateNextScreen();
  }

  render() {
    const { categoryId, subcategoryName, author, content } = this.state;
    const { categories } = this.props;

    if (categories.length === 0) {
      return null;
    }

    return (
      <View style={formStyle.container}>
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
          placeholder="「自分なら世界を変える事が出来る」そんなことを本気で信じた人達が、この世界を変えてきたのだ。"
          onChangeText={this.onChangeContent}
          marginBottom={40}
          defaultValue={content}
          isTextarea={true}
        />
        <FormButton title="登録申請する" onPress={this.onSubmit} disabled={this.isDisabled()} />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories
});

const mapDispatchToProps = {
  fetchCategories: CategoriesAction.fetchCategories,
  initializeCategories: CategoriesAction.initializeCategories,
  startLoading: loadingAction.startLoading,
  endLoading: loadingAction.endLoading,
  submitRegisterRequest: registrationRequestAction.submitRegisterRequest,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(RegistrationForm);
