export default class UpdateRequestDTO {
  static PHRASE_REGISTRATION_REQUEST_TYPE = "PhraseRegistrationRequest";
  static PHRASE_MODIFICATION_REQUEST_TYPE = "PhraseModificationRequest";
  static PHRASE_DELETION_REQUEST_TYPE = "PhraseDeletionRequest";
  static SUBCATEGORY_MODIFICATION_REQUEST_TYPE = "SubcategoryModificationRequest";

  readonly id: string;
  readonly userId: string;
  readonly type: UpdateRequestType;
  readonly finished: boolean;
  readonly decisionExpiresAt: string;
  readonly finalDecisionResult?: FinalDecisionResultType;
  readonly approvedCount: number;
  readonly rejectedCount: number;
  readonly commentCount: number;

  constructor({
    id,
    userId,
    type,
    finished,
    decisionExpiresAt,
    finalDecisionResult,
    approvedCount,
    rejectedCount,
    commentCount
  }: UpdateRequestProperty) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.finished = finished;
    this.decisionExpiresAt = decisionExpiresAt;
    this.finalDecisionResult = finalDecisionResult;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
    this.commentCount = commentCount;
  }
}

export interface UpdateRequestProperty {
  id: string;
  userId: string;
  type: UpdateRequestType;
  finished: boolean;
  decisionExpiresAt: string;
  finalDecisionResult?: FinalDecisionResultType;
  approvedCount: number;
  rejectedCount: number;
  commentCount: number;
}

export type FinalDecisionResultType = "approve" | "reject";

export type UpdateRequestType =
  | typeof UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE
  | typeof UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE
  | typeof UpdateRequestDTO.PHRASE_DELETION_REQUEST_TYPE
  | typeof UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE;
