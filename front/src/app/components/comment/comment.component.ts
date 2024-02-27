import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {CommentService} from "../../services/comment/comment.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, tap} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {CommentRequest} from "../../models/comment/comment-request";
import {CommentResponse} from "../../models/comment/comment-response";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 commentsByArticleId: CommentResponse[] = [];
  clickedArticleId: number = 0;
  userId: number = 0;
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  userConnected = false;
  commentBlog = new FormGroup({
    input: new FormControl('', [ Validators.minLength(2), Validators.maxLength(200)])
  })

  constructor( private commentSrv: CommentService, private sharedSrv: SharedService,
               private tokenService: TokenService, private router: Router) {
    this.sharedSrv.clickedArticleId$.subscribe({
      next: (clickedArticleId) => {
        this.clickedArticleId = clickedArticleId;
        this.fetchCommentsByArticleId();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    localStorage.getItem('token') ? this.userConnected = true : this.userConnected = false;
    this.getUser();
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
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  fetchCommentsByArticleId() {
    this.commentSrv.getCommentsByArticlesId(this.clickedArticleId).subscribe({
        next: (response) => {
          this.commentsByArticleId = response;
          console.log('Comments par article', this.commentsByArticleId);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  OnCreateComment() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const commentRequest: CommentRequest = {
      content: this.commentBlog.value.input,
      articleId: this.clickedArticleId,
      userId: this.userId
    }
    this.commentSrv.create(commentRequest, headers)
      .pipe(
        tap(response => {
          console.log('Commentaire créé', response);
          window.alert('Commentaire créé');
          this.router.navigate(['article']);
          location.reload();
        }),
        catchError(async (error) => {
          console.error('Error commentary creation', error);
        })
      )
      .subscribe();

  }
}
