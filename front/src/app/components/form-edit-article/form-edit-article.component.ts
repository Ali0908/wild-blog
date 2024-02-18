import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-edit-article',
  templateUrl: './form-edit-article.component.html',
  styleUrls: ['./form-edit-article.component.css']
})
export class FormEditArticleComponent {
  editArticleForm= new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    content: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
    blogId: new FormControl(null),
  })

  OnUpdateArticle() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  }
}
