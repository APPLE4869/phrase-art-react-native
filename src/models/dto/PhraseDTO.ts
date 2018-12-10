export default class PhraseDTO {
  readonly id: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly subcategoryId?: string;
  readonly subcategoryName?: string;
  readonly content: string;
  readonly authorName: string;
  readonly commentCount: number;
  readonly likeCount: number;
  readonly favoriteCount: number;

  constructor({
    id,
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName,
    content,
    authorName,
    commentCount,
    likeCount,
    favoriteCount
  }: PhraseProperty) {
    this.id = id;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.subcategoryId = subcategoryId;
    this.subcategoryName = subcategoryName;
    this.content = content;
    this.authorName = authorName;
    this.commentCount = commentCount;
    this.likeCount = likeCount;
    this.favoriteCount = favoriteCount;
  }
}

interface PhraseProperty {
  id: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  content: string;
  authorName: string;
  commentCount: number;
  likeCount: number;
  favoriteCount: number;
}

export interface PhrasesResponse {
  phrases: PhraseProperty[];
}

export interface PhraseResponse {
  phrase: PhraseProperty;
}
