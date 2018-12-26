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
  readonly currentUserLiked: boolean;
  readonly currentUserFavorited: boolean;

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
    favoriteCount,
    currentUserLiked,
    currentUserFavorited
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
    this.currentUserLiked = currentUserLiked;
    this.currentUserFavorited = currentUserFavorited;
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
  currentUserLiked: boolean;
  currentUserFavorited: boolean;
}

export interface PhrasesResponse {
  phrases: PhraseProperty[];
}

export interface PhraseResponse {
  phrase: PhraseProperty;
}
