import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import PhrasesListStatus from "../../../models/PhrasesListStatus";
import { State as RootState } from "../../../reducers";
import FavoritePhraseItemList from "../../organisms/Phrase/FavoritePhraseItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  auth: any;
  phrasesListStatus: PhrasesListStatus;
}

class PhraseListScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigateDetail = this.navigateDetail.bind(this);
  }

  navigateDetail(phraseId: string) {
    this.props.navigation.navigate("FavoriteDetail", { phraseId });
  }

  render() {
    return (
      <DefaultTemplate>
        <FavoritePhraseItemList navigateDetail={this.navigateDetail} navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  phrasesListStatus: state.phrasesListStatus.phrasesListStatus
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(PhraseListScreen);
