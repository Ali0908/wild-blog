import {Component, OnInit} from '@angular/core';
import {AuthenticationComponent} from '../authentication/authentication.component';
import {MatDialog} from '@angular/material/dialog';
import {SharedService} from "../../services/shared.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token = '';
  userConnected = false;
  hideArticleBtn = false;
  hideBlogBtn = false;
  logo: string = "assets/images/logo.png";

  constructor(public dialog: MatDialog, private sharedService: SharedService) {
    this.sharedService.hideArticleBtn$.subscribe({
      next: (hideArticleBtn) => {
        this.hideArticleBtn = hideArticleBtn;
        this.visibleArticleBtn();
      },
      error: (ErrorHideArticleBtn) => {
        console.log(ErrorHideArticleBtn);
      }
    });
    this.sharedService.hideBlogBtn$.subscribe({
      next: (hideBlogBtn) => {
        this.hideBlogBtn = hideBlogBtn;
        this.visibleBlogBtn();
      },
      error: (ErrorHideBlogBtn) => {
        console.log(ErrorHideBlogBtn);
      }
    });
  }

  ngOnInit(): void {
    localStorage.getItem('token') ? this.userConnected = true : this.userConnected = false;
  }

  openAuthenticationDialog() {
    const dialogRef = this.dialog.open(AuthenticationComponent);

    dialogRef.afterClosed().subscribe();
  }

  visibleArticleBtn() {
    return this.hideArticleBtn && this.userConnected;
  }

  visibleBlogBtn() {
    return !this.hideBlogBtn && this.userConnected;
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
