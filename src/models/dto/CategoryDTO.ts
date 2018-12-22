export default class CategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;

  constructor({ id, name, imageUrl }: CategoryProperty) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

interface CategoryProperty {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CategoryResponse {
  category: CategoryProperty;
}

export interface CategoriesResponse {
  categories: CategoryProperty[];
}
