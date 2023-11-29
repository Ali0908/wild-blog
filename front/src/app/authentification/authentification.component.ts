import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
// import { confirmPasswordValidator } from './confirmPasswordValidator.directive';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule],
})
export class AuthentificationComponent {
  hide = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{10,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  getErrorEmail() {
    if (this.form.controls.email.hasError('required')) {
      return 'Merci de saisir une adresse mail';
    }

    return this.form.controls.email.hasError('email') ? 'Merci de saisir une adresse mail sous un format valide' : '';
  }
  getErrorPassword() {
    if (this.form.controls.password.hasError('required')) {
      return 'Merci de saisir un mot de passe';
    } else if (this.form.controls.password.hasError('minlength') || this.form.controls.password.hasError('pattern')) {
    return  'Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule et un caractère spécial';
  }
  return '';
}
getErrorConfirmPassword() {
  const password = this.form.controls.password.value;
  const confirmPassword = this.form.controls.confirmPassword.value;
  console.log('Mot de passe', password);
  console.log('Confirmation du mot de passe', confirmPassword);
  // if (this.form.controls.confirmPassword.hasError('confirmPasswordValidator')) {
  //   this.form.controls.confirmPassword.setErrors({'passwordmatcherror': true});
  //   return 'Les mots de passe ne correspondent pas';
  // }
  return '';
}
}
