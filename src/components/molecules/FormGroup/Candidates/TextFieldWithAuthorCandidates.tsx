import * as React from "react";
import { connect } from "react-redux";
import * as AuthorsAction from "../../../../actions/Phrase/authors";
import AuthorDTO from "../../../../models/dto/Phrase/AuthorDTO";
import { State as RootState } from "../../../../reducers";
import TextFieldWithCandidates from "./TextFieldWithCandidates";

interface Props {
  categoryId: string;
  subcategoryName: string;
  authorName: string;
  authorCandidates: AuthorDTO[];
  fetchAuthorCandidates: any;
  initializeAuthorCandidates: any;
  onChangeText: (text: string, isCandidate?: boolean) => void;
}

interface State {
  isFetching: boolean;
}

class TextFieldWithAuthorCandidates extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isFetching: false };

    this.onChangeAuthor = this.onChangeAuthor.bind(this);
  }

  onChangeAuthor(authorName: string, isCandidate?: boolean) {
    const { onChangeText, categoryId, subcategoryName, initializeAuthorCandidates } = this.props;

    onChangeText(authorName);

    if (!isCandidate && authorName) {
      this.fetchCandidates(subcategoryName, categoryId, authorName);
    } else {
      initializeAuthorCandidates();
    }
  }

  async fetchCandidates(subcategoryName: string, categoryId: string, authorName: string) {
    if (this.state.isFetching) {
      return;
    }

    const { fetchAuthorCandidates } = this.props;

    this.setState({ isFetching: true });

    await fetchAuthorCandidates(authorName, categoryId, subcategoryName);

    this.setState({ isFetching: false });
  }

  render() {
    const { authorName, authorCandidates } = this.props;

    return (
      <TextFieldWithCandidates
        label="作者"
        placeholder="スティーブ・ジョブズ"
        description="スペースは入力できません。"
        onChangeText={this.onChangeAuthor}
        defaultValue={authorName}
        candidates={authorCandidates.map(c => ({ label: c.name, value: c.name }))}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  authorCandidates: state.authors.authorCandidates
});

const mapDispatchToProps = {
  fetchAuthorCandidates: AuthorsAction.fetchAuthorCandidates,
  initializeAuthorCandidates: AuthorsAction.initializeAuthorCandidates
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(TextFieldWithAuthorCandidates);
