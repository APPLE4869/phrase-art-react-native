import * as React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as UpdateRequestListActions from "../../../actions/UpdateRequest/updateRequestList";
import PhraseUpdateRequestDTO from "../../../models/dto/UpdateRequestList/PhraseUpdateRequestDTO";
import SubcategoryModificationRequestDTO from "../../../models/dto/UpdateRequestList/SubcategoryModificationRequestDTO";
import UpdateRequestDTO, { UpdateRequestType } from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import PhraseUpdateRequestItem from "../../molecules/UpdateRequest/PhraseUpdateRequestItem";
import SubcategoryModificationRequestItem from "../../molecules/UpdateRequest/SubcategoryModificationRequestItem";

interface Props {
  finishedUpdateRequests: Array<PhraseUpdateRequestDTO | SubcategoryModificationRequestDTO>;
  fetchFinishedUpdateRequests: any;
  initializeFinishedUpdateRequests: any;
  onPress: (updateRequestId: string, updateRequestType: UpdateRequestType) => void;
}

interface State {
  loading: boolean;
  stopFetching: boolean;
  refreshLoading: boolean;
}

class FinishedUpdateRequestItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, stopFetching: false, refreshLoading: false };

    this.onRefresh = this.onRefresh.bind(this);

    this.initializeFetch();
  }

  async initializeFetch() {
    const { initializeFinishedUpdateRequests, fetchFinishedUpdateRequests } = this.props;

    initializeFinishedUpdateRequests();

    // 初期表示用の更新申請を取得
    await fetchFinishedUpdateRequests();
  }

  async fetchFinishedUpdateRequestsWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    const { fetchFinishedUpdateRequests, finishedUpdateRequests } = this.props;

    this.setState({ loading: true });

    const offset: number = finishedUpdateRequests.length;
    await fetchFinishedUpdateRequests(offset);

    if (this.props.finishedUpdateRequests.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  async onRefresh() {
    const { initializeFinishedUpdateRequests, fetchFinishedUpdateRequests } = this.props;

    initializeFinishedUpdateRequests();

    await fetchFinishedUpdateRequests();
    this.setState({ stopFetching: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching, refreshLoading } = this.state;

    return loading || stopFetching || refreshLoading;
  }

  render() {
    const { finishedUpdateRequests, onPress } = this.props;
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={finishedUpdateRequests}
        keyExtractor={(updateRequest: UpdateRequestDTO) => updateRequest.id}
        renderItem={({ item: updateRequest, index }) =>
          updateRequest.type === UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE ? (
            <SubcategoryModificationRequestItem
              subcategoryModificationRequest={updateRequest as SubcategoryModificationRequestDTO}
              onPress={onPress}
              isFirst={index === 0}
            />
          ) : (
            <PhraseUpdateRequestItem
              phraseUpdateRequest={updateRequest as PhraseUpdateRequestDTO}
              onPress={onPress}
              isFirst={index === 0}
            />
          )
        }
        onEndReached={() => this.fetchFinishedUpdateRequestsWithAwait()}
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
    width: "100%"
  }
});

const mapStateToProps = (state: RootState) => ({
  finishedUpdateRequests: state.updateRequests.finishedUpdateRequests
});

const mapDispatchToProps = {
  fetchFinishedUpdateRequests: UpdateRequestListActions.fetchFinishedUpdateRequests,
  initializeFinishedUpdateRequests: UpdateRequestListActions.initializeFinishedUpdateRequests
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(FinishedUpdateRequestItemList);
