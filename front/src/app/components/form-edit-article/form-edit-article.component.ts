import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../services/blog/blog.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleResponse} from "../../models/article/article-response";

@Component({
  selector: 'app-form-edit-article',
  templateUrl: './form-edit-article.component.html',
  styleUrls: ['./form-edit-article.component.css']
})
export class FormEditArticleComponent implements OnInit {
  blogs: any = [];
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  userId: number = 0;
  articleId: string = '';
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  private allArticles: ArticleResponse[]= [];
  constructor(private blogSrv: BlogService, private tokenService: TokenService, private articleService: ArticleService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
    this.fetchArticleIdFromUrl();
    this.getAllBlogs();
  }

  editArticleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    content: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
    blogTitle: new FormControl(''),
  })

  getUser() {
    this.allTokens$.subscribe({
      next: (allToken) => {
        this.allTokens = allToken;
        console.log('allTokens', this.allTokens);
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            this.fetchArticlesById();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  OnUpdatePublishedArticle() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  }

  getAllBlogs() {
    this.blogSrv.getAllBlogs().subscribe(res => {
      this.blogs = res;
      console.log('blogs', this.blogs);
    })
  }

  OnUpdateSavedArticle() {
  }

  fetchArticleIdFromUrl() {
    this.activatedRoute.params.subscribe(params => {
      this.articleId = params['id']; // Extract the ID from the URL parameters
    });
  }
  fetchArticlesById() {
    if (this.token && this.userId !== 0) {
      this.articleService.getAllArticlesByUser(this.userId, this.headers).subscribe((data) => {
        this.allArticles = data;
        for (const article of this.allArticles) {
          const articleIdToString = article.id.toString();
          if (articleIdToString === this.articleId) {
            this.editArticleForm.patchValue({
              title: article.title,
              content: article.content,
              blogTitle: article.blogTitle,
            });
            break;
          }
        }
      });
    }
  }
}
