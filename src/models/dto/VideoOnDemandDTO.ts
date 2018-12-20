export default class VideoOnDemandDTO {
  readonly nameKey: string;
  readonly username: string;
  readonly imageUrl: string;
  readonly url: string;

  constructor({ nameKey, username, imageUrl, url }: VideoOnDemandProperty) {
    this.nameKey = nameKey;
    this.username = username;
    this.imageUrl = imageUrl;
    this.url = url;
  }
}

interface VideoOnDemandProperty {
  nameKey: string;
  username: string;
  imageUrl: string;
  url: string;
}

export interface VideoOnDemandsResponse {
  videoOnDemands: VideoOnDemandProperty[];
}
