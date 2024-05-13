import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseUrl = 'http://localhost:8080/api/v1/token';
  constructor(private http: HttpClient) { }

  getAllTokens(): Observable<TokenResponse[]>{
    return this.http.get<TokenResponse[]>(`${this.baseUrl}`);
  }
}
