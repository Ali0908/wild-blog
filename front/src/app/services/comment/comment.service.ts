import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentRequest} from "../../models/comment/comment-request";
import {Observable} from "rxjs";
import {CommentResponse} from "../../models/comment/comment-response";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/v1/comment';
  constructor(private http: HttpClient) { }
  getCommentsByArticlesId(articleId: any) {
    return this.http.get(`${this.baseUrl}/article/${articleId}`);
  }
  create(commentRequest: CommentRequest, headers: { Authorization: string; } ){
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
    return this.http.post(`${this.baseUrl}/create`, commentRequest, { headers });
  }

  getAllCommentsByUser(userId: number, headers: { Authorization: string }): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }
}
