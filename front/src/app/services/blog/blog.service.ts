import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BlogRequest} from "../../models/blog-request";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:8080/api/v1/blog';
  constructor(private http: HttpClient) { }

  createBlog(blogRequest: BlogRequest) {
    return this.http.post(`${this.baseUrl}/create`, blogRequest);
  }
}
