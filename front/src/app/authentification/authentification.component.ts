import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { confirmPasswordValidator} from './confirmPasswordValidator.directive';
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
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password :  new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{10,}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: confirmPasswordValidator});

  onSubmit() {
    console.log(this.form);
    console.log(this.form?.value);
    // console.log(this.form?.valueChanges);
  }
}
