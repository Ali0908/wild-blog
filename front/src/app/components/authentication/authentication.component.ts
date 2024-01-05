import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { confirmPasswordValidator} from './confirmPasswordValidator.directive';
import {RegisterRequest} from "../../models/register-request";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {catchError, tap} from "rxjs";
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, HttpClientModule],
})
export class AuthenticationComponent {
  constructor( private authenticationService: AuthenticationService) {
  }
  hide = true;
  form = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password :  new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{10,}$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {validators: confirmPasswordValidator});
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
            window.alert('Utilisateur crée');
          }),
          catchError(async (error) => console.error('Error creating user', error))
        )
        .subscribe();
    } else {
      window.alert('Veuillez remplir correctement tous les champs');
    }
  }
}
