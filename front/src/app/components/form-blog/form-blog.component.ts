import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from '../../services/blog/blog.service';
import {catchError, Observable, tap} from "rxjs";
import {BlogRequest} from "../../models/blog/blog-request";
import {CategoryService} from "../../services/category/category.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";
import {TokenResponse} from "../../models/token/token-response";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-form-blog',
  templateUrl: './form-blog.component.html',
  styleUrls: ['./form-blog.component.css']
})
export class FormBlogComponent implements OnInit {
  categories: any = [];
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  userId: number = 0;

  constructor(private blogService: BlogService, private categoryService: CategoryService,
              private router: Router, private tokenService: TokenService, private sharedService: SharedService) {
  }

  formBlog = new FormGroup({
    blogTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    categories: new FormControl(null),
  })


  ngOnInit(): void {
    this.getAllCategories();
    this.getUser();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log('categories', this.categories);
    })
  }

  getUser() {
    this.allTokens$.subscribe(  {
      next: (allToken) => {
        this.allTokens = allToken;
        console.log('allTokens', this.allTokens);
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            console.log('userId', this.userId);
            this.sharedService.getUserId(this.userId);
          }
        }
      },
        error: (err) => {
        console.log(err);
      }
    });
  }

OnCreateBlog()
{
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const blog: BlogRequest = {
    title: this.formBlog.value.blogTitle,
    categoryId: this.formBlog.value.categories,
    userId: this.userId
  }
  this.blogService.createBlog(blog, headers)
    .pipe(
      tap(response => {
        console.log('Blog créé', response);
        window.alert('Blog créé');
        this.router.navigate(['dashboard']);
      }),
      catchError(async (error) => {
        console.error('Error connected user', error);
      })
    )
    .subscribe();
}
}
