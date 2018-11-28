export default class SubcategoryDTO {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: SubcategoryProperty) {
    this.id = id;
    this.name = name;
  }
}

interface SubcategoryProperty {
  id: string;
  name: string;
}

export interface SubcategoriesResponse {
  subcategories: SubcategoryProperty[];
}
