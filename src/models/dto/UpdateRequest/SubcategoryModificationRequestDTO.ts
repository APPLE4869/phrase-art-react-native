import { FinalDecisionResultType } from "../UpdateRequestList/UpdateRequestDTO";
import { UpdateRequestDecisionProperty } from "./UpdateRequestDecisionDTO";

export default class SubcategoryModificationRequestDTO {
  readonly id: string;
  readonly finished: boolean;
  readonly decisionExpiresAt: string;
  readonly finalDecisionResult?: FinalDecisionResultType;
  readonly requestedSubcategoryId: string;
  readonly requestedSubcategoryName: string;
  readonly requestedSubcategoryIntroduction?: string;
  readonly requestedSubcategoryImagePath?: string;
  readonly requestedVideoOnDemandNameKeys?: string[];
  readonly currentCategoryId: string;
  readonly currentCategoryName: string;
  readonly currentSubcategoryName: string;
  readonly currentSubcategoryIntroduction?: string;
  readonly currentSubcategoryImagePath?: string;
  readonly currentVideoOnDemandNameKeys?: string[];
  readonly approvedCount: number;
  readonly rejectedCount: number;

  constructor({
    id,
    finished,
    decisionExpiresAt,
    finalDecisionResult,
    requestedSubcategoryId,
    requestedSubcategoryName,
    requestedSubcategoryIntroduction,
    requestedSubcategoryImagePath,
    requestedVideoOnDemandNameKeys,
    currentCategoryId,
    currentCategoryName,
    currentSubcategoryName,
    currentSubcategoryIntroduction,
    currentSubcategoryImagePath,
    currentVideoOnDemandNameKeys,
    approvedCount,
    rejectedCount
  }: SubcategoryModificationRequestProperty) {
    this.id = id;
    this.finished = finished;
    this.decisionExpiresAt = decisionExpiresAt;
    this.finalDecisionResult = finalDecisionResult;
    this.requestedSubcategoryId = requestedSubcategoryId;
    this.requestedSubcategoryName = requestedSubcategoryName;
    this.requestedSubcategoryIntroduction = requestedSubcategoryIntroduction;
    this.requestedSubcategoryImagePath = requestedSubcategoryImagePath;
    this.requestedVideoOnDemandNameKeys = requestedVideoOnDemandNameKeys;
    this.currentCategoryId = currentCategoryId;
    this.currentCategoryName = currentCategoryName;
    this.currentSubcategoryName = currentSubcategoryName;
    this.currentSubcategoryIntroduction = currentSubcategoryIntroduction;
    this.currentSubcategoryImagePath = currentSubcategoryImagePath;
    this.currentVideoOnDemandNameKeys = currentVideoOnDemandNameKeys;
    this.approvedCount = approvedCount;
    this.rejectedCount = rejectedCount;
  }
}

interface SubcategoryModificationRequestProperty {
  id: string;
  finished: boolean;
  decisionExpiresAt: string;
  finalDecisionResult?: FinalDecisionResultType;
  requestedSubcategoryId: string;
  requestedSubcategoryName: string;
  requestedSubcategoryIntroduction?: string;
  requestedSubcategoryImagePath?: string;
  requestedVideoOnDemandNameKeys?: string[];
  currentCategoryId: string;
  currentCategoryName: string;
  currentSubcategoryName: string;
  currentSubcategoryIntroduction?: string;
  currentSubcategoryImagePath?: string;
  currentVideoOnDemandNameKeys?: string[];
  approvedCount: number;
  rejectedCount: number;
}

export interface SubcategoryModificationRequestResponse {
  subcategoryModificationRequest: SubcategoryModificationRequestProperty;
  updateRequestDecision: UpdateRequestDecisionProperty;
}
