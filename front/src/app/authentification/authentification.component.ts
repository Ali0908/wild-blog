import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule,CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  form: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; confirmPassword: FormControl<string | null>; }>;
  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.passwordStrengthValidator]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator])
    });
  }
  hide = true;


  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Merci de saisir une valeur.';
    }

    if (control.hasError('email')) {
      return 'L\'adresse email saisie n\'est pas valide.';
    }

    if (control.hasError('strength')) {
      return 'Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule et un caractère spécial.';
    }

    if (control.hasError('match')) {
      return 'Le mot de passe confirmé ne correspond pas au mot de passe saisi.';
    }

    return '';
  }
  passwordStrengthValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/.test(value);
    const isLongEnough = value.length >= 10;

    if (!hasUpperCase || !hasLowerCase || !hasSpecialCharacter || !isLongEnough) {
      return { strength: true };
    }

    return null;
  }
  confirmPasswordValidator(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
  if (control.value){
    if (control.value !== this.form.controls.password.value) {
      return { confirmPassword: true };
    }
  }
    return null;
  }
}
