export interface CommentRequest {
  id?: number;
  content?: string | null;
  articleId?: number;
  userId?: number;
}
