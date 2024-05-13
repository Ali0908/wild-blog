import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../services/blog/blog.service";
import {catchError, Observable, tap} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleResponse} from "../../models/article/article-response";
import {ArticleRequest} from "../../models/article/article-request";

@Component({
  selector: 'app-form-edit-article',
  templateUrl: './form-edit-article.component.html',
  styleUrls: ['./form-edit-article.component.css']
})
export class FormEditArticleComponent implements OnInit {
  blogs: any = [];
  allTokens: TokenResponse[] = [];
  userId: number = 0;
  articleId: string = '';
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  private allArticles: ArticleResponse[]= [];
  constructor(private blogSrv: BlogService, private tokenService: TokenService, private articleService: ArticleService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
    this.fetchArticleIdFromUrl();
    this.getAllBlogs();
  }

  editArticleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    blog: new FormControl(''),
  })

  getUser() {
    this.tokenService.getAllTokens().subscribe({
      next: (allToken) => {
        this.allTokens = allToken;
        console.log('allTokens', this.allTokens);
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            console.log('userId', this.userId);
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
      const article: ArticleRequest = {
        title: this.editArticleForm.value.title,
        content: this.editArticleForm.value.content,
        blogTitle: this.editArticleForm.value.blog,
        isSaved: false
      }
      this.articleService.updateArticleByUser(this.articleId, this.userId, article, this.headers)
        .pipe(
          tap(response => {
            console.log('Article modifié', response);
            window.alert('Article modifié');
            this.router.navigate(['articlesByAuthor']);
          }),
          catchError(async (error) => {
            console.error('Error connected user', error);
          })
        )
        .subscribe();
    }

  getAllBlogs() {
    this.blogSrv.getAllBlogs().subscribe(res => {
      this.blogs = res;
      console.log('blogs', this.blogs);
    })
  }

  OnUpdateSavedArticle() {
    const article: ArticleRequest = {
      title: this.editArticleForm.value.title,
      content: this.editArticleForm.value.content,
      blogTitle: this.editArticleForm.value.blog,
      isSaved: true
    }
    this.articleService.updateArticleByUser(this.articleId, this.userId, article, this.headers)
      .pipe(
        tap(response => {
          console.log('Article modifié', response);
          window.alert('Article modifié');
          this.router.navigate(['articlesByAuthor']);
        }),
        catchError(async (error) => {
          console.error('Error connected user', error);
        })
      )
      .subscribe();
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
              blog: article.blogTitle,
            });
            break;
          }
        }
      });
    }
  }
}
