import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {BlogResponse} from "../../models/blog/blog-response";
import {BlogService} from "../../services/blog/blog.service";
import {CategoryRequest} from "../../models/category/categoryRequest";
import {CategoryService} from "../../services/category/category.service";

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
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  userId: number = 0;
  blogId: string = '';
  dataBlogs: BlogResponse[] = [];
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  categories: CategoryRequest[] =[];

  constructor(private tokenService: TokenService, private activatedRoute: ActivatedRoute, private blogService: BlogService
              , private categoryService: CategoryService) {
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
    this.categoryService.getAllCategories().subscribe((res:CategoryRequest[])  => {
      this.categories = res;
      console.log('categories', this.categories);
    });
  }
  ngOnInit(): void {
    this.getUser();
    this.fetchBlogIdFromUrl();
    this.fetchCategories();

  }


  OnEditBlog() {
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
         console.log('dataSource on edit', this.dataBlogs);
        for (const blog of this.dataBlogs) {
          const blogIdToString = blog.id.toString();
          console.log('blog', blog);
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
