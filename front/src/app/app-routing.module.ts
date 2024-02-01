import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormBlogComponent} from "./components/form-blog/form-blog.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {authGuard} from "./services/authentication/auth.guard";
import {ArticleComponent} from "./components/article/article.component";
import {FormArticleComponent} from "./components/form-article/form-article.component";
import {BlogsByAuthorComponent} from "./components/blogs-by-author/blogs-by-author.component";

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
    path: 'articleForm',
    component: FormArticleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogsByAuthor',
    component: BlogsByAuthorComponent,
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
