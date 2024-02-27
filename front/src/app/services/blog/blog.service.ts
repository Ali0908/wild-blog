import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BlogRequest} from "../../models/blog/blog-request";
import {BlogResponse} from "../../models/blog/blog-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:8080/api/v1/blog';
  constructor(private http: HttpClient) { }

  createBlog(blogRequest: BlogRequest, headers: { Authorization: string; }) {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;

    return this.http.post(`${this.baseUrl}/create`, blogRequest, { headers });
  }
  getAllBlogs(): Observable<BlogResponse[]> {
    return this.http.get<BlogResponse[]>(`${this.baseUrl}`);
  }
  getAllBlogsByUser(userId:number, headers: { Authorization: string; }): Observable<BlogResponse[]>{
    return this.http.get<BlogResponse[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }
  updateBlogByUser(blogId: string, userId:number, blogRequest: BlogRequest, headers: { Authorization: string; }) {
    return this.http.put(`${this.baseUrl}/user/${blogId}/${userId}`, blogRequest, { headers });
  }

  deleteBlogByUser(blogId: string, userId: string, headers: { Authorization: string; }) {
    return this.http.delete(`${this.baseUrl}/user/blog/${blogId}/${userId}`, { headers });
  }
  deleteAllBlogsByUser(userId: string, headers: { Authorization: string; }) {
    return this.http.delete(`${this.baseUrl}/user/blogs/${userId}`, { headers });
  }

}
