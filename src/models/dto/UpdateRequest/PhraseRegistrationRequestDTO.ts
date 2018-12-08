import { PhraseDecisionProperty } from "./PhraseDecisionDTO";

export default class PhraseRegistrationRequestDTO {
  readonly id: string;
  readonly finished: boolean;
  readonly updateRequestType: PhraseUpdateRequestType;
  readonly phraseUpdateRequestType: PhraseRegistrationRequestType;
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
  }: PhraseRegistrationRequestProperty) {
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

interface PhraseRegistrationRequestProperty {
  id: string;
  finished: boolean;
  updateRequestType: PhraseUpdateRequestType;
  phraseUpdateRequestType: PhraseRegistrationRequestType;
  decisionExpiresAt: string;
  categoryName: string;
  subcategoryName?: string;
  phraseContent: string;
  authorName: string;
  approvedCount: number;
  rejectedCount: number;
}

type PhraseUpdateRequestType = "PhraseUpdateRequest";
type PhraseRegistrationRequestType = "PhraseRegistrationRequest";

export interface PhraseRegistrationRequestResponse {
  phraseRegistrationRequest: PhraseRegistrationRequestProperty;
  phraseDecision: PhraseDecisionProperty;
}
