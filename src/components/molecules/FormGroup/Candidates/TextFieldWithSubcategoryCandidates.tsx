import * as React from "react";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../../../actions/subcategories";
import SubcategoryDTO from "../../../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../../../reducers";
import TextFieldWithCandidates from "./TextFieldWithCandidates";

interface Props {
  categoryId: string;
  subcategoryName: string;
  subcategoryCandidates: SubcategoryDTO[];
  fetchSubcategoryCandidates: any;
  initializeSubcategoryCandidates: any;
  onChangeText: (text: string, isCandidate?: boolean) => void;
}

interface State {
  isFetching: boolean;
}

class TextFieldWithSubcategoryCandidates extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isFetching: false };

    this.onChangeSubcategoryName = this.onChangeSubcategoryName.bind(this);
  }

  onChangeSubcategoryName(subcategoryName: string, isCandidate?: boolean) {
    const { onChangeText, categoryId, initializeSubcategoryCandidates } = this.props;

    onChangeText(subcategoryName);

    if (!isCandidate && subcategoryName) {
      this.fetchCandidates(subcategoryName, categoryId);
    } else {
      initializeSubcategoryCandidates();
    }
  }

  async fetchCandidates(subcategoryName: string, categoryId: string) {
    if (this.state.isFetching) {
      return;
    }

    const { fetchSubcategoryCandidates } = this.props;

    this.setState({ isFetching: true });

    await fetchSubcategoryCandidates(subcategoryName, categoryId);

    this.setState({ isFetching: false });
  }

  render() {
    const { subcategoryName, subcategoryCandidates } = this.props;

    return (
      <TextFieldWithCandidates
        label="サブカテゴリー"
        placeholder="経営者"
        onChangeText={this.onChangeSubcategoryName}
        defaultValue={subcategoryName}
        candidates={subcategoryCandidates.map(c => ({ label: c.name, value: c.name }))}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  subcategoryCandidates: state.subcategories.subcategoryCandidates
});

const mapDispatchToProps = {
  fetchSubcategoryCandidates: SubcategoriesAction.fetchSubcategoryCandidates,
  initializeSubcategoryCandidates: SubcategoriesAction.initializeSubcategoryCandidates
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(TextFieldWithSubcategoryCandidates);
