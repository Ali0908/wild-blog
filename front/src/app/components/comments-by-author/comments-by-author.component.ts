import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommentResponse} from "../../models/comment/comment-response";
import {Observable} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {CommentService} from "../../services/comment/comment.service";

@Component({
  selector: 'app-comments-by-author',
  templateUrl: './comments-by-author.component.html',
  styleUrls: ['./comments-by-author.component.css']
})
export class CommentsByAuthorComponent implements OnInit {
  dataComments: any;
  headerColumns = ['comments', 'articleTitle'];
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  token = localStorage.getItem('token');
  userId: number = 0;
  headers = {
    Authorization: `Bearer ${this.token}`
  };

  constructor(private tokenService: TokenService, private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.dataComments = new MatTableDataSource<CommentResponse>();
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
            this.fetchCommentsByAuthor();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchCommentsByAuthor() {
    if (this.token && this.userId !== 0) {
      this.commentService.getAllCommentsByUser(this.userId, this.headers).subscribe((data: any) => {
        console.log('comments', data);
        this.dataComments = new MatTableDataSource<CommentResponse[]>(data);
      });
    }
  }
}
