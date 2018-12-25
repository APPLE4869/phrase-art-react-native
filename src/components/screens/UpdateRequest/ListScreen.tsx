import * as React from "react";
import { View } from "react-native";
import { NavigationParams } from "react-navigation";
import UpdateRequestDTO, { UpdateRequestType } from "../../../models/dto/UpdateRequestList/UpdateRequestDTO";
import NavigationOptions from "../../../navigators/NavigationOptions";
import { colors } from "../../../styles";
import HeaderSegmented from "../../molecules/HeaderSegmented";
import FinishedUpdateRequestItemList from "../../organisms/UpdateRequest/FinishedUpdateRequestItemList";
import RequestingUpdateRequestItemList from "../../organisms/UpdateRequest/RequestingUpdateRequestItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

interface State {
  headerSegmentedIndex: number;
}

export default class ListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: { ...NavigationOptions.headerStyle, borderBottomColor: colors.special.navigationBarBackground }
  };

  constructor(props: Props) {
    super(props);

    this.state = { headerSegmentedIndex: 0 };

    this.navigateUpdateRequest = this.navigateUpdateRequest.bind(this);
    this.onChangeIndex = this.onChangeIndex.bind(this);
  }

  navigateUpdateRequest(updateRequestId: string, updateRequestType: UpdateRequestType) {
    const { navigation } = this.props;

    if (updateRequestType === UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE) {
      // サブカテゴリー修正申請
      navigation.navigate("SubcategoryModificationRequestDetail", { updateRequestId });
    } else {
      // 名言更新申請
      navigation.navigate("PhraseUpdateRequestDetail", { updateRequestId, updateRequestType });
    }
  }

  onChangeIndex(headerSegmentedIndex: number) {
    this.setState({ headerSegmentedIndex });
  }

  render() {
    const { headerSegmentedIndex } = this.state;

    return (
      <DefaultTemplate>
        <View style={{ width: "100%", flex: 1 }}>
          <HeaderSegmented
            values={["申請中", "完了済"]}
            onChangeIndex={this.onChangeIndex}
            selectedIndex={headerSegmentedIndex}
          />
          {headerSegmentedIndex === 0 ? (
            <RequestingUpdateRequestItemList onPress={this.navigateUpdateRequest} />
          ) : (
            <FinishedUpdateRequestItemList onPress={this.navigateUpdateRequest} />
          )}
        </View>
      </DefaultTemplate>
    );
  }
}
