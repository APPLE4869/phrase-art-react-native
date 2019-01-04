export default class CategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly totalSubcategoryCount: number;
  readonly totalPhraseCount: number;
  readonly totalCommentCount: number;
  readonly totalLikeCount: number;
  readonly totalFavoriteCount: number;

  constructor({
    id,
    name,
    imageUrl,
    totalSubcategoryCount,
    totalPhraseCount,
    totalCommentCount,
    totalLikeCount,
    totalFavoriteCount
  }: CategoryProperty) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.totalSubcategoryCount = totalSubcategoryCount;
    this.totalPhraseCount = totalPhraseCount;
    this.totalCommentCount = totalCommentCount;
    this.totalLikeCount = totalLikeCount;
    this.totalFavoriteCount = totalFavoriteCount;
  }
}

interface CategoryProperty {
  id: string;
  name: string;
  imageUrl: string;
  totalSubcategoryCount: number;
  totalPhraseCount: number;
  totalCommentCount: number;
  totalLikeCount: number;
  totalFavoriteCount: number;
}

export interface CategoryResponse {
  category: CategoryProperty;
}

export interface CategoriesResponse {
  categories: CategoryProperty[];
}
