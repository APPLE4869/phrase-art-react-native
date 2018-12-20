export default class SubcategoryDTO {
  readonly id: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly introduction?: string;
  readonly videoOnDemandNameKeys: string[];

  constructor({
    id,
    categoryId,
    categoryName,
    name,
    imageUrl,
    introduction,
    videoOnDemandNameKeys
  }: SubcategoryProperty) {
    this.id = id;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.name = name;
    this.imageUrl = imageUrl;
    this.introduction = introduction;
    this.videoOnDemandNameKeys = videoOnDemandNameKeys;
  }
}

interface SubcategoryProperty {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  imageUrl?: string;
  introduction?: string;
  videoOnDemandNameKeys: string[];
}

export interface SubcategoriesResponse {
  subcategories: SubcategoryProperty[];
}

export interface SubcategoryResponse {
  subcategory: SubcategoryProperty;
}
