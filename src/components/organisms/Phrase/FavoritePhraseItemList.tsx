import * as React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { NavigationEventsProps } from "react-navigation";
import { connect } from "react-redux";
import * as PhrasesAction from "../../../actions/Phrase/phrases";
import PhraseDTO from "../../../models/dto/PhraseDTO";
import { State as RootState } from "../../../reducers";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";
import PhraseItem from "../../molecules/PhraseItem";

interface Props {
  navigation: NavigationEventsProps;
  navigateDetail: (phraseId: string) => void;
  favoritePhrases: PhraseDTO[];
  fetchFavoritePhrases: any;
  initializeFavoritePhrase: any;
}

interface State {
  initializing: boolean;
  loading: boolean;
  stopFetching: boolean;
  refreshLoading: boolean;
}

// TODO : 現状の仕様だと、途中でお気に入りを解除した際にoffsetがズレるバグがあるので、それをうまく調整するように改修する。
class FavoritePhraseItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { initializing: true, loading: false, stopFetching: false, refreshLoading: false };
    this.fetchPhraseWithAwait = this.fetchPhraseWithAwait.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.initialize();
  }

  async initialize() {
    const { initializeFavoritePhrase, fetchFavoritePhrases } = this.props;
    initializeFavoritePhrase();
    await fetchFavoritePhrases();
    this.setState({ initializing: false });
  }

  async fetchPhraseWithAwait() {
    if (this.isUnableToFetch()) {
      return;
    }

    this.setState({ loading: true });

    const { favoritePhrases, fetchFavoritePhrases } = this.props;
    const offset: number = favoritePhrases.length;
    await fetchFavoritePhrases(offset);

    if (this.props.favoritePhrases.length === offset) {
      // 取得件数が0の場合は、それ以降の取得処理を停止
      this.setState({ stopFetching: true });
    }

    this.setState({ loading: false });
  }

  async onRefresh() {
    this.setState({ initializing: true });

    const { initializeFavoritePhrase, fetchFavoritePhrases } = this.props;

    initializeFavoritePhrase();

    await fetchFavoritePhrases();
    this.setState({ initializing: false, stopFetching: false });
  }

  isUnableToFetch(): boolean {
    const { loading, stopFetching, refreshLoading } = this.state;
    return loading || stopFetching || refreshLoading;
  }

  listEmptyComponent() {
    const { initializing } = this.state;

    if (initializing) {
      return null;
    }
    return (
      <View style={{ alignItems: "center", marginTop: 45 }}>
        <StandardText fontSize={13} text="お気に入り登録中の名言はありません。" textStyle={styles.emptyItemText} />
        <StandardText fontSize={13} text="少しでも気になる名言は" textStyle={styles.emptyItemText} />
        <StandardText fontSize={13} text="お気に入り登録してみましょう！" textStyle={styles.emptyItemText} />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { refreshLoading } = this.state;

    return (
      <FlatList
        style={styles.container}
        data={this.props.favoritePhrases}
        keyExtractor={(phrase: PhraseDTO) => phrase.id}
        renderItem={({ item: phrase, index }) => (
          <PhraseItem
            navigation={navigation}
            navigateDetail={this.props.navigateDetail}
            phrase={phrase}
            isFirst={index === 0}
          />
        )}
        ListEmptyComponent={this.listEmptyComponent()}
        onEndReached={this.fetchPhraseWithAwait}
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
  },
  emptyItemText: {
    textAlign: "center",
    color: colors.grayLevel1,
    marginBottom: 10
  }
});

const mapStateToProps = (state: RootState) => ({
  favoritePhrases: state.phrases.favoritePhrases
});

const mapDispatchToProps = {
  fetchFavoritePhrases: PhrasesAction.fetchFavoritePhrases,
  initializeFavoritePhrase: PhrasesAction.initializeFavoritePhrase
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(FavoritePhraseItemList);
