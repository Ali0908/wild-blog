import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormBlogComponent} from "./components/form-blog/form-blog.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blogForm', component: FormBlogComponent },
  { path: 'register', component: AuthenticationComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
