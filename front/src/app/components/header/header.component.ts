import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from "../login/login.component";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe();
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(AuthenticationComponent);

    dialogRef.afterClosed().subscribe();
  }

  openBlogForm() {

  }
}
