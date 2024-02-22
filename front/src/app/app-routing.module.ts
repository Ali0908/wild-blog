import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormBlogComponent} from "./components/form-blog/form-blog.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {authGuard} from "./services/authentication/auth.guard";
import {ArticleComponent} from "./components/article/article.component";
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {BlogsByAuthorComponent} from "./components/blogs-by-author/blogs-by-author.component";
import {FormEditBlogComponent} from "./components/form-edit-blog/form-edit-blog.component";
import {ArticlesByAuthorComponent} from "./components/articles-by-author/articles-by-author.component";
import {CommentsByAuthorComponent} from "./components/comments-by-author/comments-by-author.component";
import {FormEditArticleComponent} from "./components/form-edit-article/form-edit-article.component";
import {FormEditCommentComponent} from "./components/form-edit-comment/form-edit-comment.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'register', component: AuthenticationComponent},
  {
    path: 'blogForm',
    component: FormBlogComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editBlogForm/:id',
    component: FormEditBlogComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editArticleForm/:id',
    component: FormEditArticleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editCommentForm/:id',
    component: FormEditCommentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'articleForm',
    component: FormArticleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogsByAuthor',
    component: BlogsByAuthorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'articlesByAuthor',
    component: ArticlesByAuthorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'commentsByAuthor',
    component: CommentsByAuthorComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
