import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RegisterRequest} from "../../models/auth/register-request";
import {AuthenticationResponse} from "../../models/auth/authentication-response";
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest} from "../../models/auth/authentication-request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, registerRequest);
  }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authRequest);
  }
}
