import { FinalDecisionResultType } from "../UpdateRequestList/UpdateRequestDTO";
import { PhraseDecisionProperty } from "./PhraseDecisionDTO";

export default class PhraseDeletionRequestDTO {
  readonly id: string;
  readonly finished: boolean;
  readonly decisionExpiresAt: string;
  readonly finalDecisionResult?: FinalDecisionResultType;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly subcategoryId?: string;
  readonly subcategoryName?: string;
  readonly phraseContent: string;
  readonly phraseAuthorName: string;
  readonly approvedCount: number;
  readonly rejectedCount: number;

  constructor({
    id,
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
    rejectedCount
  }: PhraseDeletionRequestProperty) {
    this.id = id;
    this.finished = finished;
    this.decisionExpiresAt = decisionExpiresAt;
    this.finalDecisionResult = finalDecisionResult;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.subcategoryId = subcategoryId;
    this.subcategoryName = subcategoryName;
    this.phraseContent = phraseContent;
    this.phraseAuthorName = phraseAuthorName;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
  }
}

interface PhraseDeletionRequestProperty {
  id: string;
  finished: boolean;
  decisionExpiresAt: string;
  finalDecisionResult?: FinalDecisionResultType;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  phraseContent: string;
  phraseAuthorName: string;
  approvedCount: number;
  rejectedCount: number;
}

export interface PhraseDeletionRequestResponse {
  phraseDeletionRequest: PhraseDeletionRequestProperty;
  phraseDecision: PhraseDecisionProperty;
}
