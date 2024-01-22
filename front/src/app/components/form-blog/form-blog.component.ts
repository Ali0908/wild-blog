import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { BlogService } from '../../services/blog/blog.service';
import {catchError, tap} from "rxjs";
import {BlogRequest} from "../../models/blog-request";
import {CategoryService} from "../../services/category/category.service";
@Component({
  selector: 'app-form-blog',
  templateUrl: './form-blog.component.html',
  styleUrls: ['./form-blog.component.css']
})
export class FormBlogComponent implements OnInit  {
   categories: any = [];
  constructor(private blogService: BlogService, private categoryService: CategoryService) {
  }
  formBlog = new FormGroup({
    blogTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    categories: new FormControl(null),
  })


  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe( res => {
      this.categories = res;
      console.log('categories', this.categories);
    })
  }

  OnCreateBlog() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const blog: BlogRequest  = {
      title: this.formBlog.value.blogTitle,
      categoryId: this.formBlog.value.categories
    }
    this.blogService.createBlog(blog, headers)
      .pipe(
        tap(response => {
          console.log('Blog créé', response);
          window.alert('Blog créé');
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
        })
      )
      .subscribe();
  }
}
