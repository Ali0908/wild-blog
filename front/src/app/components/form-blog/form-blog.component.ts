import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { BlogService } from '../../services/blog/blog.service';
import {catchError, tap} from "rxjs";
import {BlogRequest} from "../../models/blog-request";

@Component({
  selector: 'app-form-blog',
  templateUrl: './form-blog.component.html',
  styleUrls: ['./form-blog.component.css']
})
export class FormBlogComponent {
  constructor(private BlogService: BlogService) {
  }
  formBlog = new FormGroup({
    blogTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    categories: new FormControl('Tech'),
  })

  OnCreateBlog() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const blog: BlogRequest  = {
      title: this.formBlog.value.blogTitle,
      categories: this.formBlog.value.categories,
    }
    this.BlogService.createBlog(blog, headers)
      .pipe(
        tap(response => {
          console.log('Blog créé', response);
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
        })
      )
      .subscribe();
  }
}
