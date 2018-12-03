import * as React from "react";
import { NavigationParams } from "react-navigation";
import Index from "../../organisms/Configure/Index";
import DefaultTemplate from "../../templates/DefaultTemplate";

interface Props {
  navigation: NavigationParams;
}

export default class IndexScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <DefaultTemplate>
        <Index navigation={this.props.navigation} />
      </DefaultTemplate>
    );
  }
}
