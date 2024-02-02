import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryRequest} from "../../models/category/categoryRequest";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/category';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryRequest[]>{
    return this.http.get<CategoryRequest[]>(`${this.baseUrl}`);
  }
}
