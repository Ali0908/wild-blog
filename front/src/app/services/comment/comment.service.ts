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
  getCommentsByArticlesId(articleId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.baseUrl}/article/${articleId}`);
  }
  create(commentRequest: CommentRequest, headers: { Authorization: string; } ): Observable<CommentRequest>{
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
    return this.http.post(`${this.baseUrl}/create`, commentRequest, { headers });
  }

  getAllCommentsByUser(userId: number, headers: { Authorization: string }): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }
  updateCommentByUser(commentId: string, userId:number, commentRequest: CommentRequest, headers: { Authorization: string; }) {
    return this.http.put(`${this.baseUrl}/user/${commentId}/${userId}`, commentRequest, { headers });
  }
  deleteCommentByUser(commentId: string, userId: string, headers: { Authorization: string; }) {
    return this.http.delete(`${this.baseUrl}/user/${commentId}/${userId}`, { headers });
  }
  deleteAllCommentsByUser(userId: string, headers: { Authorization: string; }) {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, { headers });
  }
}
