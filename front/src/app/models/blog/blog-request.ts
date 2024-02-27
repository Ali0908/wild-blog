export interface BlogRequest {
  title?: string | null;
  categoryId: number | null | undefined;
  access_token?: string| null;
  userId?: number;
}
