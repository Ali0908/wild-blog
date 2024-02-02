import {Component, OnInit} from '@angular/core';
import {BlogResponse} from "../../models/blog/blog-response";
import {BlogService} from "../../services/blog/blog.service";
import {catchError, Observable, tap} from "rxjs";
import {TokenResponse} from "../../models/token/token-response";
import {TokenService} from "../../services/token/token.service";
import {SelectionModel} from "@angular/cdk/collections";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-blogs-by-author',
  templateUrl: './blogs-by-author.component.html',
  styleUrls: ['./blogs-by-author.component.css']
})
export class BlogsByAuthorComponent implements OnInit {
  dataBlogs: BlogResponse[] = [];
  allTokens$: Observable<TokenResponse> = this.tokenService.getAllTokens();
  allTokens: any = [];
  userId: number = 0;
  headerColumns = ['select', 'title', 'categoryName', 'update', 'delete'];
  selection = new SelectionModel<BlogResponse>(true, []);
  token = localStorage.getItem('token');
  headers = {
    Authorization: `Bearer ${this.token}`
  };

  constructor(private blogService: BlogService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.allTokens$.subscribe({
      next: (allToken) => {
        this.allTokens = allToken;
        console.log('allTokens', this.allTokens);
        const tokenStorage = localStorage.getItem('token');
        for (const token of this.allTokens) {
          if (token.token === tokenStorage) {
            this.userId = token.userId;
            console.log('userId', this.userId);
            this.fetchBlogsByAuthor();
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  fetchBlogsByAuthor() {
    if (this.token && this.userId !== 0) {
      this.blogService.getAllBlogsByUser(this.userId, this.headers).subscribe((data: BlogResponse[]) => {
        this.dataBlogs = data;
        // console.log('dataSource', this.dataBlogs);
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataBlogs.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataBlogs);
  }

  checkboxLabel(row?: BlogResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteBlog(blogId: number) {
    const blogToString = blogId.toString();
    const userToString = this.userId.toString();
    this.blogService.deleteBlogByUser(blogToString, userToString, this.headers)
      .pipe(
        tap(response => {
          // console.log('Blog créé', response);
          window.alert('Blog supprimé');
          location.reload();
        }),
        catchError(async (error) => {
          // console.error('Error connected user', error);
          window.alert('Erreur lors de la suppression du blog');
          location.reload();
        })
      )
      .subscribe();
  }

  deleteAllBlogs(userId: string) {
    userId = this.userId.toString();
    this.blogService.deleteAllBlogsByUser(userId, this.headers).pipe(
      tap(response => {
        // console.log('Blog créé', response);
        window.alert('Tous les blogs ont été supprimés');
        location.reload();
      }),
      catchError(async (error) => {
        // console.error('Error connected user', error);
        window.alert('Un ou plusieurs blogs n\'ont pas été supprimés car ils sont liés à des articles. Supprimez d\'abord les articles.');
        location.reload();
      })
    )
      .subscribe()
  }
}
