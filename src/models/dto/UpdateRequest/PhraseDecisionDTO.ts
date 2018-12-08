export default class PhraseDecisionDTO {
  readonly result: ResultType;

  constructor({ result }: PhraseDecisionProperty) {
    this.result = result;
  }
}

export type ResultType = "approve" | "reject";

export interface PhraseDecisionProperty {
  result: ResultType;
}

export interface PhraseDecisionResponse {
  phraseDecision: PhraseDecisionProperty;
}
