import { Component } from '@angular/core';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(AuthentificationComponent);

    dialogRef.afterClosed().subscribe();
  }
}
