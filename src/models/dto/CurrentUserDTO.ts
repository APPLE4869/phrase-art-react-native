export default class CurrentUserDTO {
  readonly id: string;
  readonly username: string;

  constructor({ id, username }: CurrentUserProperty) {
    this.id = id;
    this.username = username;
  }
}

interface CurrentUserProperty {
  id: string;
  username: string;
}

export interface CurrentUserResponse {
  currentUser: CurrentUserProperty;
}
