import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../services/blog/blog.service";
import {ArticleRequest} from "../../models/article/article-request";
import {ArticleService} from "../../services/article/article.service";
import {catchError, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  blogs: any = [];
  isSaved = false;

  constructor(private articleSrv: ArticleService, private blogSrv: BlogService, private router: Router) {
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
      isSaved: false
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

  OnSavedArticle() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const article: ArticleRequest = {
      title: this.articleForm.value.title,
      content: this.articleForm.value.content,
      blogId: this.articleForm.value.blogId,
      isSaved: true
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
  }

  getAllBlogs() {
    this.blogSrv.getAllBlogs().subscribe(res => {
      this.blogs = res;
      console.log('blogs', this.blogs);
    })
  }
}
