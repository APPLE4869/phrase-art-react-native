import * as React from "react";
import { Image, View } from "react-native";
import { colors } from "../../../styles";
import StandardText from "../../atoms/StandardText";

interface Props {
  count: number;
}

export default class CommentWithCount extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { count } = this.props;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 43 }}>
        <Image
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
          source={require("../../../../assets/images/icon/phrase-item/comment.png")}
        />
        {count > 0 ? (
          <StandardText text={String(count)} fontSize={11} textStyle={{ color: colors.grayLevel1 }} />
        ) : null}
      </View>
    );
  }
}
