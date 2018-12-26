import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { connect } from "react-redux";
import * as CategoriesAction from "../../../actions/categories";
import * as loadingAction from "../../../actions/loading";
import * as QuickbloxAction from "../../../actions/quickblox";
import * as phraseModificationRequestAction from "../../../actions/UpdateRequest/phraseModificationRequest";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { formStyle } from "../../../styles";
import { deleteAllHalfAndFullSpace, replaceMoreThreeBlankLineToTwo } from "../../../support/replace";
import FormButton from "../../atoms/FormButton";
import TextFieldWithAuthorCandidates from "../../molecules/FormGroup/Candidates/TextFieldWithAuthorCandidates";
import TextFieldWithSubcategoryCandidates from "../../molecules/FormGroup/Candidates/TextFieldWithSubcategoryCandidates";
import SelectField from "../../molecules/FormGroup/SelectField";
import TextField from "../../molecules/FormGroup/TextField";

interface Props {
  phrase: PhraseDTO;
  navigateNextScreen: () => void;
  categories: CategoryDTO[];
  fetchCategories: any;
  startLoading: any;
  endLoading: any;
  submitPhraseModificationRequest: any;
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

class ModificationForm extends React.Component<Props, State> {
  private windowWidth: number;

  constructor(props: Props) {
    super(props);

    const windowSize = Dimensions.get("window");
    this.windowWidth = windowSize.width;

    const { phrase } = this.props;
    this.state = {
      selectedCategory: undefined,
      categoryId: phrase.categoryId,
      subcategoryName: phrase.subcategoryName || "",
      author: phrase.authorName,
      content: phrase.content
    };

    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.fetchCategoriesAndsetInitialCategoryId();
  }

  async fetchCategoriesAndsetInitialCategoryId() {
    const { fetchCategories, phrase } = this.props;

    // 初期表示用のカテゴリーを取得
    await fetchCategories();

    this.onChangeSelectedCategory(phrase.categoryId);
  }

  onChangeSelectedCategory(categoryId: string) {
    this.props.categories.forEach(category => {
      if (categoryId === category.id) {
        this.setState({ selectedCategory: category });
      }
    });
  }

  onChangeCategoryId(categoryId: string) {
    this.setState({ categoryId });
    this.onChangeSelectedCategory(categoryId);
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

    if (subcategoryName && author && content && this.isAnyChanged()) {
      return false;
    }

    return true;
  }

  isAnyChanged(): boolean {
    const { phrase: current } = this.props;
    const { categoryId, subcategoryName, author, content } = this.state;
    if (
      current.categoryId !== categoryId ||
      current.subcategoryName !== subcategoryName ||
      current.authorName !== author ||
      current.content !== content
    ) {
      return true;
    }
    return false;
  }

  async onSubmit() {
    const {
      phrase,
      startLoading,
      endLoading,
      navigateNextScreen,
      submitPhraseModificationRequest,
      addMessage
    } = this.props;
    const { categoryId, subcategoryName, content, author } = this.state;
    startLoading();

    try {
      await submitPhraseModificationRequest(
        phrase.id,
        categoryId,
        subcategoryName.trim(),
        replaceMoreThreeBlankLineToTwo(content.trim()),
        deleteAllHalfAndFullSpace(author.trim())
      );
    } finally {
      endLoading();
    }

    addMessage("名言の修正申請に成功しました。");
    navigateNextScreen();
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
        <FormButton title="修正申請する" onPress={this.onSubmit} disabled={this.isDisabled()} />
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
  submitPhraseModificationRequest: phraseModificationRequestAction.submitPhraseModificationRequest,
  addMessage: QuickbloxAction.addMessage
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(ModificationForm);
