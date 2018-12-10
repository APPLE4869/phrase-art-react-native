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
  readonly approvedCount: number;
  readonly rejectedCount: number;

  constructor({ id, userId, type, finished, decisionExpiresAt, approvedCount, rejectedCount }: UpdateRequestProperty) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.finished = finished;
    this.decisionExpiresAt = decisionExpiresAt;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
  }
}

export interface UpdateRequestProperty {
  id: string;
  userId: string;
  type: UpdateRequestType;
  finished: boolean;
  decisionExpiresAt: string;
  approvedCount: number;
  rejectedCount: number;
}

export type UpdateRequestType =
  | typeof UpdateRequestDTO.PHRASE_REGISTRATION_REQUEST_TYPE
  | typeof UpdateRequestDTO.PHRASE_MODIFICATION_REQUEST_TYPE
  | typeof UpdateRequestDTO.PHRASE_DELETION_REQUEST_TYPE
  | typeof UpdateRequestDTO.SUBCATEGORY_MODIFICATION_REQUEST_TYPE;