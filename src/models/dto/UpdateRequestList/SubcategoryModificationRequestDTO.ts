import UpdateRequestDTO, { UpdateRequestProperty } from "./UpdateRequestDTO";

export default class SubcategoryModificationRequestDTO extends UpdateRequestDTO {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly subcategoryId?: string;
  readonly subcategoryName?: string;
  readonly subcategoryIntroduction: string;

  constructor({
    id,
    userId,
    type,
    finished,
    decisionExpiresAt,
    finalDecisionResult,
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName,
    subcategoryIntroduction,
    approvedCount,
    rejectedCount,
    commentCount
  }: SubcategoryModificationRequestProperty) {
    super({
      id,
      userId,
      type,
      finished,
      decisionExpiresAt,
      finalDecisionResult,
      approvedCount,
      rejectedCount,
      commentCount
    });
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.subcategoryName = subcategoryName;
    this.subcategoryId = subcategoryId;
    this.subcategoryIntroduction = subcategoryIntroduction;
  }
}

export interface SubcategoryModificationRequestProperty extends UpdateRequestProperty {
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  subcategoryIntroduction: string;
}

export interface SubcategoryModificationRequestsResponse {
  updateRequests: SubcategoryModificationRequestProperty[];
}
