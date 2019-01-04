import * as React from "react";
import CategoryDTO from "../../../models/dto/CategoryDTO";
import CategoryCard from "./CategoryCard";

interface Props {
  category: CategoryDTO;
  onPress: (category: CategoryDTO) => void;
  currentCategoryId?: string | undefined;
}

export default class CategoryItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { category, onPress } = this.props;
    onPress(category);
  }

  render() {
    const { category, currentCategoryId } = this.props;

    return (
      <CategoryCard
        onPress={this.onPress}
        checked={!!(currentCategoryId && currentCategoryId === category.id)}
        name={category.name}
        imageSource={category.imageUrl ? { uri: category.imageUrl } : undefined}
        totalPhraseCount={category.totalPhraseCount}
        totalCommentCount={category.totalCommentCount}
        totalLikeCount={category.totalLikeCount}
        totalFavoriteCount={category.totalFavoriteCount}
      />
    );
  }
}
