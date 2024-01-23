import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { confirmPasswordValidator} from './confirmPasswordValidator.directive';
import {RegisterRequest} from "../../models/register-request";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {catchError, tap, window} from "rxjs";
import { HttpClientModule } from '@angular/common/http';
import {Router, RouterLink} from "@angular/router";
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {MatDialogRef} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, HttpClientModule, RouterLink],
})
export class AuthenticationComponent implements OnInit{

  constructor( private authenticationService: AuthenticationService, private dialogRef: MatDialogRef<AuthenticationComponent>
    , private router: Router) {
  }
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  register = false;
  login = true;
  hide = true;
  hideLogin = true;
  userConnected = false;
  form = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password :  new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{10,}$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {validators: confirmPasswordValidator});
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required]),
    passwordLogin: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.form.controls.userName.status && this.form.controls.email.status && this.form.controls.password.status && this.form.controls.confirmPassword.status === "VALID") {
      const user: RegisterRequest = {
        userName: this.form.value.userName,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authenticationService.register(user)
        .pipe(
          tap(response => {
            console.log('User created successfully!', response);
            // @ts-ignore
            window.alert('Utilisateur crée');
            this.register = false;
            this.login = true;
          }),
          catchError(async (error) => console.error('Error creating user', error))
        )
        .subscribe();
    } else {
      // @ts-ignore
      window.alert('Veuillez remplir correctement tous les champs');
    }
  }

  onLogin() {
    this.authRequest.email = this.loginForm.value.emailLogin;
    this.authRequest.password = this.loginForm.value.passwordLogin;
    this.authenticationService.login(this.authRequest)
      .pipe(
        tap(response => {
          this.authResponse = response;
             localStorage.setItem('token', response.access_token as string );
          console.log('User connected successfully!', response);
          window('Utilisateur connecté');
          this.dialogRef.close();
          this.router.navigate(['dashboard']).then(r => console.log('navigate to dashboard'));
          location.reload();
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
          // @ts-ignore
          window('Mot de passe ou email incorrect');
        })
      )
      .subscribe();
  }

  handleFomRenderer() {
    this.register = true;
    this.login = false;
  }

  ngOnInit(): void {

  }
}
