import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormBlogComponent } from './components/form-blog/form-blog.component';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { ArticleComponent } from './components/article/article.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FormBlogComponent,
    ArticleComponent,
    CommentComponent,
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
