import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BlogRequest} from "../../models/blog/blog-request";

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
  getAllBlogs(){
    return this.http.get(`${this.baseUrl}`);
  }

}
