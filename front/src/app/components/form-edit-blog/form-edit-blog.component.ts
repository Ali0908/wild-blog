import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {BlogResponse} from "../../models/blog/blog-response";
import {BlogService} from "../../services/blog/blog.service";
import {CategoryRequest} from "../../models/category/categoryRequest";
import {CategoryService} from "../../services/category/category.service";
import {BlogRequest} from "../../models/blog/blog-request";

@Component({
  selector: 'app-form-edit-blog',
  templateUrl: './form-edit-blog.component.html',
  styleUrls: ['./form-edit-blog.component.css']
})
export class FormEditBlogComponent implements OnInit {
  editFormBlog = new FormGroup({
    blogTitle: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    categories: new FormControl(''),
  });
  allTokens: TokenResponse[] = [];
  userId: number = 0;
  blogId: string = '';
  dataBlogs: BlogResponse[] = [];
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  categories: CategoryRequest[] = [];
  categoryId: number | undefined;

  constructor(private tokenService: TokenService, private activatedRoute: ActivatedRoute, private blogService: BlogService
    , private categoryService: CategoryService, private router: Router) {
  }

  getUser() {
    this.tokenService.getAllTokens().subscribe({
      next: (allToken) => {
        this.allTokens = allToken;
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            this.fetchBlogById();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe((res: CategoryRequest[]) => {
      this.categories = res;
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.fetchBlogIdFromUrl();
    this.fetchCategories();

  }

  getCategoryId() {
    for (const category of this.categories) {
      if (category.name === this.editFormBlog.value.categories) {
        this.categoryId = category.id;
      }
    }
  }

  OnEditBlog() {
    this.getCategoryId();
    const blog: BlogRequest = {
      title: this.editFormBlog.value.blogTitle,
      categoryId: this.categoryId,
    }
    this.blogService.updateBlogByUser(this.blogId, this.userId, blog, this.headers)
     .pipe(
          tap(response => {
            console.log('Blog modifié', response);
            window.alert('Blog modifié');
            this.router.navigate(['blogsByAuthor']);
          }),
          catchError(async (error) => {
            console.error('Error connected user', error);
          })
        )
        .subscribe();
  }

  fetchBlogIdFromUrl() {
    this.activatedRoute.params.subscribe(params => {
      this.blogId = params['id']; // Extract the ID from the URL parameters
    });
  }

  fetchBlogById() {
    if (this.token && this.userId !== 0) {
      this.blogService.getAllBlogsByUser(this.userId, this.headers).subscribe((data: BlogResponse[]) => {
        this.dataBlogs = data;
        for (const blog of this.dataBlogs) {
          const blogIdToString = blog.id.toString();
          if (blogIdToString === this.blogId) {
            this.editFormBlog.patchValue({
              blogTitle: blog.title,
              categories: blog.categoryName
            });
            break;
          }
        }
      });
    }
  }
}
