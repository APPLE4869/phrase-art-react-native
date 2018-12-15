export default class CategoryDTO {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: CategoryProperty) {
    this.id = id;
    this.name = name;
  }
}

interface CategoryProperty {
  id: string;
  name: string;
}

export interface CategoryResponse {
  category: CategoryProperty;
}

export interface CategoriesResponse {
  categories: CategoryProperty[];
}
