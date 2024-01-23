import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog/blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 constructor( private blogService: BlogService, private router: Router) {

 }
   allBlogs: any = [];
    ngOnInit(): void {
      this.blogService.getAllBlogs().subscribe((response) => {
        this.allBlogs = response;
        console.log(this.allBlogs);
      });
    }

  goToArticles() {
    this.router.navigate(['article']).then(r => console.log('navigate to article'));
  }
}
