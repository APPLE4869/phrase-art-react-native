export default class VideoOnDemandDTO {
  readonly nameKey: string;
  readonly username: string;
  readonly imageUrl: string;
  readonly url: string;
  readonly appDeepLink?: string;

  constructor({ nameKey, username, imageUrl, url, appDeepLink }: VideoOnDemandProperty) {
    this.nameKey = nameKey;
    this.username = username;
    this.imageUrl = imageUrl;
    this.url = url;
    this.appDeepLink = appDeepLink;
  }
}

interface VideoOnDemandProperty {
  nameKey: string;
  username: string;
  imageUrl: string;
  url: string;
  appDeepLink?: string;
}

export interface VideoOnDemandsResponse {
  videoOnDemands: VideoOnDemandProperty[];
}
