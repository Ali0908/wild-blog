import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog/blog.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {BlogResponse} from "../../models/blog/blog-response";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private blogService: BlogService, private router: Router, private sharedSrv: SharedService) {

  }

  allBlogs: BlogResponse[] = [];
  clickedBlogId: any;

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((response) => {
      this.allBlogs = response;
      console.log(this.allBlogs);
    });
  }

  handleBlogClick(blog: any) {
    this.clickedBlogId = blog;
    this.sharedSrv.getClickedBlogId(this.clickedBlogId);
    this.router.navigate(['article']);
  }

}
