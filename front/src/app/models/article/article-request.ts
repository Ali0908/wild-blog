export interface ArticleRequest {
  blogId?: number | null;
  content?: string  | null;
  title?: string | null;
  isSaved?: boolean;
  userId?: number | null;
  blogTitle?: string | null;
}
