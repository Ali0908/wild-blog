import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/category';

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get(`${this.baseUrl}`);
  }
}
