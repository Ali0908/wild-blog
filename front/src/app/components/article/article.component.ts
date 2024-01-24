import {Component} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  allArticles: any = [];
  articlesByBlogId: any = [];
  clickedBlogId: any;

  constructor(private articleSrv: ArticleService, private sharedSrv: SharedService) {

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
}
