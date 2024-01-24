import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/v1/comment';
  constructor(private http: HttpClient) { }
  getCommentsByArticlesId(articleId: any) {
    return this.http.get(`${this.baseUrl}/article/${articleId}`);
  }
}
