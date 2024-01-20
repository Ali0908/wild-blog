import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog/blog.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 constructor( private blogService: BlogService) { }
   allBlogs: any = [];
    ngOnInit(): void {
      this.blogService.getAllBlogs().subscribe((response) => {
        this.allBlogs = response;
        console.log(this.allBlogs);
      });
    }

}
