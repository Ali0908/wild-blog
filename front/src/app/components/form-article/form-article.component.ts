import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../services/blog/blog.service";
import {ArticleRequest} from "../../models/article/article-request";
import {ArticleService} from "../../services/article/article.service";
import {catchError, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  blogs: any = [];
  allTokens$: Observable<TokenResponse> = this.tokenSrv.getAllTokens();
  allTokens: any = [];
  userId: number = 0;

  constructor(private articleSrv: ArticleService, private blogSrv: BlogService, private router: Router,
  private tokenSrv: TokenService) {
  }

  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    content: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
    blogId: new FormControl(null),
  })

  OnCreateArticle() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const article: ArticleRequest = {
      title: this.articleForm.value.title,
      content: this.articleForm.value.content,
      blogId: this.articleForm.value.blogId,
      isSaved: false,
      userId: this.userId
    }
    this.articleSrv.createArticle(article, headers)
      .pipe(
        tap(response => {
          console.log('Article créé', response);
          window.alert('Article créé');
          this.router.navigate(['dashboard']);
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
        })
      )
      .subscribe();
  }


  fetchUser() {
    this.allTokens$.subscribe(  {
      next: (allToken) => {
        this.allTokens = allToken;
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  OnSavedArticle() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const article: ArticleRequest = {
      title: this.articleForm.value.title,
      content: this.articleForm.value.content,
      blogId: this.articleForm.value.blogId,
      isSaved: true,
      userId: this.userId
    }
    this.articleSrv.createArticle(article, headers)
      .pipe(
        tap(response => {
          console.log('Article Sauvegardé', response);
          window.alert('Article sauvegardé');
          this.router.navigate(['dashboard']);
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getAllBlogs();
    this.fetchUser();
  }

  getAllBlogs() {
    this.blogSrv.getAllBlogs().subscribe(res => {
      this.blogs = res;
    })
  }
}
