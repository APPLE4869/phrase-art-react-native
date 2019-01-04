export default class SubcategoryDTO {
  readonly id: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly videoOnDemandAssociated: boolean;
  readonly name: string;
  readonly imageUrl?: string;
  readonly introduction?: string;
  readonly videoOnDemandNameKeys: string[];
  readonly totalPhraseCount: number;
  readonly totalCommentCount: number;
  readonly totalLikeCount: number;
  readonly totalFavoriteCount: number;

  constructor({
    id,
    categoryId,
    categoryName,
    videoOnDemandAssociated,
    name,
    imageUrl,
    introduction,
    videoOnDemandNameKeys,
    totalPhraseCount,
    totalCommentCount,
    totalLikeCount,
    totalFavoriteCount
  }: SubcategoryProperty) {
    this.id = id;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.videoOnDemandAssociated = videoOnDemandAssociated;
    this.name = name;
    this.imageUrl = imageUrl;
    this.introduction = introduction;
    this.videoOnDemandNameKeys = videoOnDemandNameKeys;
    this.totalPhraseCount = totalPhraseCount;
    this.totalCommentCount = totalCommentCount;
    this.totalLikeCount = totalLikeCount;
    this.totalFavoriteCount = totalFavoriteCount;
  }
}

interface SubcategoryProperty {
  id: string;
  categoryId: string;
  categoryName: string;
  videoOnDemandAssociated: boolean;
  name: string;
  imageUrl?: string;
  introduction?: string;
  videoOnDemandNameKeys: string[];
  totalPhraseCount: number;
  totalCommentCount: number;
  totalLikeCount: number;
  totalFavoriteCount: number;
}

export interface SubcategoriesResponse {
  subcategories: SubcategoryProperty[];
}

export interface SubcategoryResponse {
  subcategory: SubcategoryProperty;
}
