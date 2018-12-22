export default class CurrentProfileDTO {
  readonly imageUrl?: string;

  constructor({ imageUrl }: CurrentProfileProperty) {
    this.imageUrl = imageUrl;
  }
}

interface CurrentProfileProperty {
  imageUrl?: string;
}

export interface CurrentProfileResponse {
  currentProfile: CurrentProfileProperty;
}
