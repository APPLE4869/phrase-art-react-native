export default class SubcategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly sequence: number;

  constructor({ id, name, sequence }: SubcategoryProperty) {
    this.id = id;
    this.name = name;
    this.sequence = sequence;
  }
}

interface SubcategoryProperty {
  id: string;
  name: string;
  sequence: number;
}

export interface SubcategoriesResponse {
  subcategories: SubcategoryProperty[];
}
