import { CommentInterface } from "../CommentInterface";

export default class UpdateRequestCommentDTO implements CommentInterface {
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly userImageUrl: string;
  readonly content: string;
  readonly createdAt: string;

  constructor({ id, userId, username, userImageUrl, content, createdAt }: UpdateRequestCommentProperty) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.userImageUrl = userImageUrl;
    this.content = content;
    this.createdAt = createdAt;
  }
}

interface UpdateRequestCommentProperty {
  id: string;
  userId: string;
  username: string;
  userImageUrl: string;
  content: string;
  createdAt: string;
}

export interface UpdateRequestCommentsResponse {
  comments: UpdateRequestCommentProperty[];
}
