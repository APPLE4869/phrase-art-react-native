import { FinalDecisionResultType } from "../UpdateRequestList/UpdateRequestDTO";
import { PhraseDecisionProperty } from "./PhraseDecisionDTO";

export default class PhraseModificationRequestDTO {
  readonly id: string;
  readonly finished: boolean;
  readonly decisionExpiresAt: string;
  readonly finalDecisionResult?: FinalDecisionResultType;
  readonly requestedCategoryId: string;
  readonly requestedCategoryName: string;
  readonly requestedSubcategoryId?: string;
  readonly requestedSubcategoryName?: string;
  readonly requestedPhraseContent: string;
  readonly requestedPhraseAuthorName: string;
  readonly currentCategoryId: string;
  readonly currentCategoryName: string;
  readonly currentSubcategoryId?: string;
  readonly currentSubcategoryName?: string;
  readonly currentPhraseContent: string;
  readonly currentPhraseAuthorName: string;
  readonly approvedCount: number;
  readonly rejectedCount: number;

  constructor({
    id,
    finished,
    decisionExpiresAt,
    finalDecisionResult,
    requestedCategoryId,
    requestedCategoryName,
    requestedSubcategoryId,
    requestedSubcategoryName,
    requestedPhraseContent,
    requestedPhraseAuthorName,
    currentCategoryId,
    currentCategoryName,
    currentSubcategoryId,
    currentSubcategoryName,
    currentPhraseContent,
    currentPhraseAuthorName,
    approvedCount,
    rejectedCount
  }: PhraseModificationRequestProperty) {
    this.id = id;
    this.finished = finished;
    this.decisionExpiresAt = decisionExpiresAt;
    this.finalDecisionResult = finalDecisionResult;
    this.requestedCategoryId = requestedCategoryId;
    this.requestedCategoryName = requestedCategoryName;
    this.requestedSubcategoryId = requestedSubcategoryId;
    this.requestedSubcategoryName = requestedSubcategoryName;
    this.requestedPhraseContent = requestedPhraseContent;
    this.requestedPhraseAuthorName = requestedPhraseAuthorName;
    this.currentCategoryId = currentCategoryId;
    this.currentCategoryName = currentCategoryName;
    this.currentSubcategoryId = currentSubcategoryId;
    this.currentSubcategoryName = currentSubcategoryName;
    this.currentPhraseContent = currentPhraseContent;
    this.currentPhraseAuthorName = currentPhraseAuthorName;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
  }
}

interface PhraseModificationRequestProperty {
  id: string;
  finished: boolean;
  decisionExpiresAt: string;
  finalDecisionResult?: FinalDecisionResultType;
  requestedCategoryId: string;
  requestedCategoryName: string;
  requestedSubcategoryId?: string;
  requestedSubcategoryName?: string;
  requestedPhraseContent: string;
  requestedPhraseAuthorName: string;
  currentCategoryId: string;
  currentCategoryName: string;
  currentSubcategoryId?: string;
  currentSubcategoryName?: string;
  currentPhraseContent: string;
  currentPhraseAuthorName: string;
  approvedCount: number;
  rejectedCount: number;
}

export interface PhraseModificationRequestResponse {
  phraseModificationRequest: PhraseModificationRequestProperty;
  phraseDecision: PhraseDecisionProperty;
}
