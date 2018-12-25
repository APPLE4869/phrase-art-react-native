import * as React from "react";
import { NavigationParams } from "react-navigation";
import { connect } from "react-redux";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import PhraseUpdateButton from "../../molecules/PhraseUpdateButton";
import PhraseDetail from "../../organisms/Phrase/Detail";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
  phrase: PhraseDTO | undefined;
  auth: any;
}

interface State {}

class FavoriteDetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: NavigationParams }) => {
    const auth = navigation.getParam("auth");
    const navigateModificationRequest = navigation.getParam("navigateModificationRequest");
    const navigateDeletionRequest = navigation.getParam("navigateDeletionRequest");

    return {
      headerRight: (
        <PhraseUpdateButton
          auth={auth}
          navigation={navigation}
          navigateModificationRequest={navigateModificationRequest}
          navigateDeletionRequest={navigateDeletionRequest}
        />
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.navigateModificationRequest = this.navigateModificationRequest.bind(this);
    this.navigateDeletionRequest = this.navigateDeletionRequest.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      auth: this.props.auth,
      navigateModificationRequest: this.navigateModificationRequest,
      navigateDeletionRequest: this.navigateDeletionRequest
    });
  }

  navigateModificationRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormModificationRequest", { phrase });
  }

  navigateDeletionRequest() {
    const { phrase, navigation } = this.props;
    navigation.navigate("UpdateRequestFormDeletionRequest", { phrase });
  }

  render() {
    return (
      <DefaultTemplate>
        <PhraseDetail navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  phrase: state.phrases.phrase,
  auth: state.auth
});

const mapDispatchToProps = {};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(FavoriteDetailScreen);
