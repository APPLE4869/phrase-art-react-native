import UpdateRequestDTO, { UpdateRequestProperty } from "./UpdateRequestDTO";

export default class PhraseUpdateRequestDTO extends UpdateRequestDTO {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly subcategoryId?: string;
  readonly subcategoryName?: string;
  readonly phraseContent: string;
  readonly phraseAuthorName: string;

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
    phraseContent,
    phraseAuthorName,
    approvedCount,
    rejectedCount,
    commentCount
  }: PhraseUpdateRequestProperty) {
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
    this.phraseContent = phraseContent;
    this.phraseAuthorName = phraseAuthorName;
  }
}

export interface PhraseUpdateRequestProperty extends UpdateRequestProperty {
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  phraseContent: string;
  phraseAuthorName: string;
}

export interface PhraseUpdateRequestsResponse {
  updateRequests: PhraseUpdateRequestProperty[];
}
