export default class UpdateRequestDTO {
  readonly id: string;
  readonly finished: boolean;
  readonly updateRequestType: UpdateRequestType;
  readonly phraseUpdateRequestType: PhraseUpdateRequestType;
  readonly decisionExpiresAt: string;
  readonly categoryName: string;
  readonly subcategoryName?: string;
  readonly phraseContent: string;
  readonly authorName: string;
  readonly approvedCount: number;
  readonly rejectedCount: number;

  constructor({
    id,
    finished,
    updateRequestType,
    phraseUpdateRequestType,
    decisionExpiresAt,
    categoryName,
    subcategoryName,
    phraseContent,
    authorName,
    approvedCount,
    rejectedCount
  }: UpdateRequestProperty) {
    this.id = id;
    this.finished = finished;
    this.updateRequestType = updateRequestType;
    this.phraseUpdateRequestType = phraseUpdateRequestType;
    this.decisionExpiresAt = decisionExpiresAt;
    this.categoryName = categoryName;
    this.subcategoryName = subcategoryName;
    this.phraseContent = phraseContent;
    this.authorName = authorName;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
  }
}

interface UpdateRequestProperty {
  id: string;
  finished: boolean;
  updateRequestType: UpdateRequestType;
  phraseUpdateRequestType: PhraseUpdateRequestType;
  decisionExpiresAt: string;
  categoryName: string;
  subcategoryName?: string;
  phraseContent: string;
  authorName: string;
  approvedCount: number;
  rejectedCount: number;
}

export type UpdateRequestType = "PhraseUpdateRequest" | "SubcategoryModificationRequest";
export type PhraseUpdateRequestType =
  | "PhraseRegistrationRequest"
  | "PhraseModificationRequest"
  | "PhraseDeletionRequest";

export interface UpdateRequestsResponse {
  updateRequests: UpdateRequestProperty[];
}

export interface UpdateRequestResponse {
  updateRequest: UpdateRequestProperty;
}
