export default class AuthorDTO {
  readonly name: string;

  constructor({ name }: AuthorProperty) {
    this.name = name;
  }
}

interface AuthorProperty {
  name: string;
}

export interface AuthorsResponse {
  authors: AuthorProperty[];
}
