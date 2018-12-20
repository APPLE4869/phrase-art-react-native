export default class UpdateRequestDecisionDTO {
  readonly result: ResultType;

  constructor({ result }: UpdateRequestDecisionProperty) {
    this.result = result;
  }
}

export type ResultType = "approve" | "reject";

export interface UpdateRequestDecisionProperty {
  result: ResultType;
}

export interface UpdateRequestDecisionResponse {
  updateRequestDecision: UpdateRequestDecisionProperty;
}
