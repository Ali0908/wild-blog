import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }
  openAuthenticationDialog() {
    const dialogRef = this.dialog.open(AuthenticationComponent);

    dialogRef.afterClosed().subscribe();
  }
}
