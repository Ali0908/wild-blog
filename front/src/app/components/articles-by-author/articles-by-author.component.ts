import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
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
  allTokens: TokenResponse[] = [];
  token = localStorage.getItem('token');
  userId: number = 0;
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  articlesPublished: ArticleResponse[] = [];
  allArticles: ArticleResponse[] = [];
  articlesSaved: ArticleResponse[] = [];
  usersAvatar: any = {};

  constructor(private tokenService: TokenService, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.fetchArticlesByAuthor();
  }

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
            this.fetchArticlesByAuthor();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchArticlesByAuthor() {
    if (this.token && this.userId !== 0) {
      this.articleService.getAllArticlesByUser(this.userId, this.headers).subscribe((data) => {
        this.allArticles = data;
        this.generateRandomAvatars(this.allArticles);
        this.articlesPublished = this.allArticles.filter((article) => article.isSaved === false);
        this.articlesSaved = this.allArticles.filter((article) => article.isSaved === true);
      });
    }
  }

  deleteArticle(articleId: number) {
    const articleIdString = articleId.toString();
    const userToString = this.userId.toString();
    this.articleService.deleteArticleByUser(articleIdString, userToString, this.headers)
      .pipe(
        tap(response => {
          // console.log('Blog créé', response);
          window.alert('Article supprimé');
          location.reload();
        }),
        catchError(async (error) => {
          // console.error('Error connected user', error);
          window.alert('Erreur lors de la suppression de l\'article');
          location.reload();
        })
      )
      .subscribe();

  }

  deleteAllArticles(userId: string) {
    userId = this.userId.toString();
    this.articleService.deleteAllArticlesByUser(userId, this.headers)
      .pipe(
        tap(response => {
          // console.log('Blog créé', response);
          window.alert('Tous les articles ont été supprimés');
          location.reload();
        }),
        catchError(async (error) => {
          // console.error('Error connected user', error);
          window.alert('Erreur lors de la suppression des articles');
          location.reload();
        })
      )
      .subscribe();

  }

  generateRandomAvatars = (articles: ArticleResponse[]) => {
    for (const article of articles) {
      const userId = article.username; // Ou toute autre propriété unique de l'utilisateur
      if (!this.usersAvatar[userId]) {
        const randomNumber = Math.floor(Math.random() * 1000);
        this.usersAvatar[userId] = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${randomNumber}`;
      }
    }
    ;
  }
}
