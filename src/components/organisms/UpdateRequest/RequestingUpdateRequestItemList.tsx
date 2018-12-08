import * as React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as UpdateRequestActions from "../../../actions/UpdateRequest/updateRequest";
import UpdateRequestDTO, {
  PhraseUpdateRequestType,
  UpdateRequestType
} from "../../../models/dto/UpdateRequest/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import PhraseUpdateRequestItem from "../../molecules/PhraseUpdateRequestItem";

interface Props {
  requestingUpdateRequests: UpdateRequestDTO[];
  fetchRequestingUpdateRequests: any;
  initializeRequestingUpdateRequests: any;
  onPress: (
    updateRequestId: string,
    updateRequestType: UpdateRequestType,
    phraseUpdateRequestType: PhraseUpdateRequestType
  ) => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
  refreshLoading: boolean;
}

class RequestingUpdateRequestItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false, refreshLoading: false };

    this.onRefresh = this.onRefresh.bind(this);

    this.initializeFetch();
  }

  async initializeFetch() {
    const { initializeRequestingUpdateRequests, fetchRequestingUpdateRequests } = this.props;

    initializeRequestingUpdateRequests();

    // 初期表示用の更新申請を取得
    await fetchRequestingUpdateRequests();
  }

  async fetchRequestingUpdateRequestsWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { fetchRequestingUpdateRequests, requestingUpdateRequests } = this.props;

    this.setState({ loading: true });

    const offset: number = requestingUpdateRequests.length;
    await fetchRequestingUpdateRequests(offset);

    if (this.props.requestingUpdateRequests.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  async onRefresh() {
    const { initializeRequestingUpdateRequests, fetchRequestingUpdateRequests } = this.props;

    initializeRequestingUpdateRequests();

    await fetchRequestingUpdateRequests();
    this.setState({ stopFetching: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching, refreshLoading } = this.state;

    return loading || stopFetching || refreshLoading;
  }

  render() {
    const { requestingUpdateRequests, onPress } = this.props;
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={requestingUpdateRequests}
        keyExtractor={(updateRequest: UpdateRequestDTO) => updateRequest.id}
        renderItem={({ item: requestingUpdateRequest }) => (
          <PhraseUpdateRequestItem updateRequest={requestingUpdateRequest} onPress={onPress} />
        )}
        onEndReached={() => this.fetchRequestingUpdateRequestsWithAwait()}
        onEndReachedThreshold={3}
        refreshing={refreshLoading}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={this.onRefresh} tintColor={colors.grayLevel4} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1
  }
});

const mapStateToProps = (state: RootState) => ({
  requestingUpdateRequests: state.updateRequests.requestingUpdateRequests
});

const mapDispatchToProps = {
  fetchRequestingUpdateRequests: UpdateRequestActions.fetchRequestingUpdateRequests,
  initializeRequestingUpdateRequests: UpdateRequestActions.initializeRequestingUpdateRequests
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(RequestingUpdateRequestItemList);
