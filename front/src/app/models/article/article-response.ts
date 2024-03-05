export interface ArticleResponse {
  id: number;
  blogId?: number;
  blogTitle?: string;
  content: string;
  title: string;
  isSaved: boolean;
  username?: string;
}
