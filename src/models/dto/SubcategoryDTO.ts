export default class SubcategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly categoryId: string;

  constructor({ id, categoryId, name }: SubcategoryProperty) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
  }
}

interface SubcategoryProperty {
  id: string;
  categoryId: string;
  name: string;
}

export interface SubcategoriesResponse {
  subcategories: SubcategoryProperty[];
}

export interface SubcategoryResponse {
  subcategory: SubcategoryProperty;
}
