export default class CategoryDTO {
  readonly id: string;
  readonly name: string;
  readonly sequence: number;

  constructor({ id, name, sequence }: CategoryProperty) {
    this.id = id;
    this.name = name;
    this.sequence = sequence;
  }
}

interface CategoryProperty {
  id: string;
  name: string;
  sequence: number;
}

export interface CategoriesResponse {
  categories: CategoryProperty[];
}
