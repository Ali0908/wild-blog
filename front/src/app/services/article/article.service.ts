import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleResponse} from "../../models/article/article-response";
import {ArticleRequest} from "../../models/article/article-request";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:8080/api/v1/article';
  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(`${this.baseUrl}`);
  }
  getArticlesByBlogId(blogId: any) {
    return this.http.get(`${this.baseUrl}/blog/${blogId}`);
  }
  createArticle(articleRequest: ArticleRequest, headers: { Authorization: string; }) {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;

    return this.http.post(`${this.baseUrl}/create`, articleRequest, { headers });
  }
}