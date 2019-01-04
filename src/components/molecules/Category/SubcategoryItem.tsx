import * as React from "react";
import SubcategoryDTO from "../../../models/dto/SubcategoryDTO";
import CategoryCard from "./CategoryCard";

interface Props {
  subcategory: SubcategoryDTO;
  onPress: (category: SubcategoryDTO) => void;
  currentSubcategoryId?: string | undefined;
}

export default class SubcategoryItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { subcategory, onPress } = this.props;
    onPress(subcategory);
  }

  render() {
    const { subcategory, currentSubcategoryId } = this.props;

    return (
      <CategoryCard
        onPress={this.onPress}
        checked={!!(currentSubcategoryId && currentSubcategoryId === subcategory.id)}
        name={subcategory.name}
        imageSource={subcategory.imageUrl ? { uri: subcategory.imageUrl } : undefined}
        totalPhraseCount={subcategory.totalPhraseCount}
        totalCommentCount={subcategory.totalCommentCount}
        totalLikeCount={subcategory.totalLikeCount}
        totalFavoriteCount={subcategory.totalFavoriteCount}
      />
    );
  }
}
