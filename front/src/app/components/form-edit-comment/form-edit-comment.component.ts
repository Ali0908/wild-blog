import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, tap} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {CommentService} from "../../services/comment/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentRequest} from "../../models/comment/comment-request";

@Component({
  selector: 'app-form-edit-comment',
  template: `
    <app-header></app-header>
    <form class="form-edit-comment" [formGroup]="commentBlog" (ngSubmit)="OnEditComment()">
      <mat-form-field appearance="outline">
        <mat-label>Commentaires:</mat-label>
        <input matInput formControlName="input" required>
        <mat-error
          *ngIf="commentBlog.get('input')?.hasError('minlength') || commentBlog.get('input')?.hasError('maxlength')"> Le
          commentaire doit contenir entre 2 et 100 caratères
        </mat-error>
      </mat-form-field>
      <button mat-raised-button type="submit" class="sendBtn">
        <mat-icon>send</mat-icon>
      </button>
    </form>
  `,
  styleUrls: ['./form-edit-comment.component.css']
})
export class FormEditCommentComponent implements OnInit {
  commentsByArticleId: any = [];
  userId: number = 0;
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };
  commentBlog = new FormGroup({
    input: new FormControl('', [Validators.minLength(2), Validators.maxLength(100)])
  })
  articleId: string = '';

  constructor(private tokenService: TokenService, private commentSrv: CommentService, private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
    this.fetchArticleIdFromUrl();
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
            this.fetchCommentsByArticleId();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchCommentsByArticleId() {
    if (this.token && this.userId !== 0) {
      this.commentSrv.getAllCommentsByUser(this.userId, this.headers).subscribe({
        next: (response) => {
          this.commentsByArticleId = response;
          for (const article of this.commentsByArticleId) {
            const articleIdToString = article.id.toString();
            if (articleIdToString === this.articleId) {
              this.commentBlog.patchValue({
                input: article.content,
              });
              break;
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  OnEditComment() {
    const comment: CommentRequest = {
      content: this.commentBlog.value.input
    }
    this.commentSrv.updateCommentByUser(this.articleId, this.userId, comment, this.headers)
      .pipe(
        tap(response => {
          console.log('Commentaire modifié', response);
          window.alert('Commentaire modifié');
          this.router.navigate(['commentsByAuthor']);
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
}
