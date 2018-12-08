import * as React from "react";
import { View } from "react-native";
import { NavigationParams } from "react-navigation";
import { PhraseUpdateRequestType, UpdateRequestType } from "../../../models/dto/UpdateRequest/UpdateRequestDTO";
import NavigationOptions from "../../../navigators/BottomTabContent/NavigationOptions";
import { colors } from "../../../styles";
import HeaderSegmentedControlIOS from "../../molecules/HeaderSegmentedControlIOS";
import FinishedUpdateRequestItemList from "../../organisms/UpdateRequest/FinishedUpdateRequestItemList";
import RequestingUpdateRequestItemList from "../../organisms/UpdateRequest/RequestingUpdateRequestItemList";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

interface State {
  headerSegmentedControlIOSIndex: number;
}

export default class ListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: { ...NavigationOptions.headerStyle, borderBottomColor: colors.special.navigationBarBackground }
  };

  constructor(props: Props) {
    super(props);

    this.state = { headerSegmentedControlIOSIndex: 0 };

    this.navigateUpdateRequest = this.navigateUpdateRequest.bind(this);
    this.onChangeSegmentedControl = this.onChangeSegmentedControl.bind(this);
  }

  navigateUpdateRequest(
    updateRequestId: string,
    updateRequestType: UpdateRequestType,
    phraseUpdateRequestType: PhraseUpdateRequestType
  ) {
    const { navigation } = this.props;

    if (updateRequestType === "SubcategoryModificationRequest") {
      // サブカテゴリー修正申請
      // TODO : Screenを差し替える。
      navigation.navigate("PhraseUpdateRequest", { updateRequestId });
    } else {
      // 名言更新申請
      navigation.navigate("PhraseUpdateRequest", { updateRequestId, type: phraseUpdateRequestType });
    }
  }

  onChangeSegmentedControl(event: any) {
    const { selectedSegmentIndex } = event.nativeEvent;
    this.setState({ headerSegmentedControlIOSIndex: selectedSegmentIndex });
  }

  render() {
    const { headerSegmentedControlIOSIndex } = this.state;

    return (
      <DefaultTemplate>
        <View style={{ width: "100%", flex: 1 }}>
          <HeaderSegmentedControlIOS
            values={["申請中", "完了済"]}
            onChange={this.onChangeSegmentedControl}
            selectedIndex={headerSegmentedControlIOSIndex}
          />
          {headerSegmentedControlIOSIndex === 0 ? (
            <RequestingUpdateRequestItemList onPress={this.navigateUpdateRequest} />
          ) : (
            <FinishedUpdateRequestItemList onPress={this.navigateUpdateRequest} />
          )}
        </View>
      </DefaultTemplate>
    );
  }
}