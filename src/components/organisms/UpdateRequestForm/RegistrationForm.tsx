import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import * as registrationRequestAction from "../../../actions/UpdateRequest/phraseRegistrationRequest";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import { State as RootState } from "../../../reducers";
import { formStyle } from "../../../styles";
import { deleteAllHalfAndFullSpace, replaceMoreThreeBlankLineToTwo } from "../../../support/replace";
import FormButton from "../../atoms/FormButton";
import TextFieldWithAuthorCandidates from "../../molecules/FormGroup/Candidates/TextFieldWithAuthorCandidates";
import TextFieldWithSubcategoryCandidates from "../../molecules/FormGroup/Candidates/TextFieldWithSubcategoryCandidates";
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
  selectedCategory?: CategoryDTO;
  categoryId: string;
  subcategoryName: string;
  author: string;
  content: string;
}

class RegistrationForm extends React.Component<Props, State> {
  private windowWidth: number;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.windowWidth = windowSize.width;

    this.state = { selectedCategory: undefined, categoryId: "", subcategoryName: "", author: "", content: "" };

    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onPressCandidates = this.onPressCandidates.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.fetchCategoriesAndsetInitialCategoryId();
  }

  fetchCategoriesAndsetInitialCategoryId() {
    const { fetchCategories } = this.props;

    // 初期表示用のカテゴリーを取得
    fetchCategories();
  }

  onChangeCategoryId(categoryId: string) {
    this.setState({ categoryId });
    this.onChangeSelectedCategory(categoryId);
  }

  onChangeSelectedCategory(categoryId: string) {
    this.props.categories.forEach(category => {
      if (categoryId === category.id) {
        this.setState({ selectedCategory: category });
      }
    });
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
      await submitRegisterRequest(
        categoryId,
        subcategoryName.trim(),
        replaceMoreThreeBlankLineToTwo(content.trim()),
        deleteAllHalfAndFullSpace(author.trim())
      );
    } finally {
      endLoading();
    }

    addMessage("名言の登録申請に成功しました。");
    navigateNextScreen();
  }

  onPressCandidates(value: string) {
    alert(value);
  }

  render() {
    const { selectedCategory, categoryId, subcategoryName, author, content } = this.state;
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
        {selectedCategory ? (
          <Image
            style={{
              width: this.windowWidth,
              height: this.windowWidth * 0.3,
              position: "absolute",
              zIndex: -1,
              opacity: 0.3
            }}
            source={{ uri: selectedCategory.imageUrl }}
          />
        ) : null}
        <TextFieldWithSubcategoryCandidates
          categoryId={categoryId}
          subcategoryName={subcategoryName}
          onChangeText={this.onChangeSubcategoryName}
        />
        <TextFieldWithAuthorCandidates
          categoryId={categoryId}
          subcategoryName={subcategoryName}
          authorName={author}
          onChangeText={this.onChangeAuthor}
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
