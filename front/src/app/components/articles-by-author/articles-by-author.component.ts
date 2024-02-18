import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {ArticleService} from "../../services/article/article.service";
import {ArticleResponse} from "../../models/article/article-response";

@Component({
  selector: 'app-articles-by-author',
  templateUrl: './articles-by-author.component.html',
  styleUrls: ['./articles-by-author.component.css']
})
export class ArticlesByAuthorComponent implements OnInit {
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  token = localStorage.getItem('token');
  userId: number = 0;
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  articlesPublished: ArticleResponse[] = [];
  articlesSaved: ArticleResponse[]= [];
  constructor( private tokenService: TokenService, private articleService: ArticleService) {
  }

  ngOnInit(): void {
        this.getUser();
        this.fetchArticlesPublishedByAuthor();
        this.fetchArticlesSavedByAuthor();
    }
  getUser() {
    this.allTokens$.subscribe({
      next: (allToken) => {
        this.allTokens = allToken;
        console.log('allTokens', this.allTokens);
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            console.log('userId', this.userId);
            this.fetchArticlesSavedByAuthor();
            this.fetchArticlesPublishedByAuthor();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   fetchArticlesSavedByAuthor() {
    if (this.token && this.userId !== 0) {
      this.articleService.getAllArticlesSavedByUser(this.userId, this.headers).subscribe((data) => {
        this.articlesSaved = data;
        console.log('articlesSaved', this.articlesSaved);
      });
    }
  }

  fetchArticlesPublishedByAuthor() {
    if (this.token && this.userId !== 0) {
      this.articleService.getAllArticlesPublishedByUser(this.userId, this.headers).subscribe((data) => {
        this.articlesPublished = data;
        console.log('articlesPublished', this.articlesPublished);
      });
    }
  }
}
