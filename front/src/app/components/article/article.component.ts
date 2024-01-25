import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {SharedService} from "../../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentComponent} from "../comment/comment.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  allArticles: any = [];
  articlesByBlogId: any = [];
  clickedBlogId: any;
  hideArticleBtn = true;

  constructor(private articleSrv: ArticleService, private sharedSrv: SharedService, public dialog: MatDialog) {

    this.sharedSrv.clickedBlogId$.subscribe({
      next: (clickedBlogId) => {
        this.clickedBlogId = clickedBlogId;
        this.fetchArticlesByBlogId();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
       this.sharedSrv.getHideBlogBtn(this.hideArticleBtn);
       this.sharedSrv.getHideArticleBtn(this.hideArticleBtn);
    }

  fetchArticles() {
    this.articleSrv.getAllArticles().subscribe((response) => {
      this.allArticles = response;
      // console.log(' Tous les articles', this.allArticles);
    });
  }

  fetchArticlesByBlogId() {
    this.articleSrv.getArticlesByBlogId(this.clickedBlogId).subscribe({
        next: (response) => {
          this.articlesByBlogId = response;
          console.log('Articles par blog', this.articlesByBlogId);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  };

  OpenCommentDialog(articleId: any) {
    this.sharedSrv.getClickedArticleId(articleId);
    const dialogRef = this.dialog.open(CommentComponent);
    dialogRef.afterClosed().subscribe();

  }
}
