import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormBlogComponent} from './components/form-blog/form-blog.component';
import {AppRoutingModule} from './app-routing.module';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {ArticleComponent} from './components/article/article.component';
import {CommentComponent} from './components/comment/comment.component';
import {FormArticleComponent} from './components/form-article/form-article.component';
import {BlogsByAuthorComponent} from './components/blogs-by-author/blogs-by-author.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import { FormEditBlogComponent } from './components/form-edit-blog/form-edit-blog.component';
import {NgOptimizedImage} from "@angular/common";
import { CommentsByAuthorComponent } from './components/comments-by-author/comments-by-author.component';
import { ArticlesByAuthorComponent } from './components/articles-by-author/articles-by-author.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FormBlogComponent,
    ArticleComponent,
    CommentComponent,
    FormArticleComponent,
    BlogsByAuthorComponent,
    FormEditBlogComponent,
    CommentsByAuthorComponent,
    ArticlesByAuthorComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        AuthenticationComponent,
        AppRoutingModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatTableModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
