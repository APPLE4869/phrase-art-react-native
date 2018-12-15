export default class PhrasesListStatus {
  readonly categoryType: CategoryType;
  readonly categoryId?: string;
  readonly subcategoryId?: string;

  constructor({ categoryType, categoryId, subcategoryId }: PhrasesListStatusProperty) {
    this.categoryType = categoryType;
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
  }
}

export interface PhrasesListStatusProperty {
  categoryType: CategoryType;
  categoryId: string | undefined;
  subcategoryId: string | undefined;
}

export type CategoryType = "category" | "subcategory" | undefined;
