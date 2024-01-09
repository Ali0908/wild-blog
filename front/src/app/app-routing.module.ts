import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormBlogComponent} from "./components/form-blog/form-blog.component";
const routes: Routes = [
  { path: 'blogForm', component: FormBlogComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
