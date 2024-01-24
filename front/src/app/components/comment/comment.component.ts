import {Component} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {CommentService} from "../../services/comment/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent{
 commentsByArticleId: any = [];
  clickedArticleId: any;

  constructor( private commentSrv: CommentService, private sharedSrv: SharedService) {
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
}
