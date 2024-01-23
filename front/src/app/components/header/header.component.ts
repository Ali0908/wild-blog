import {Component, OnInit} from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { MatDialog } from '@angular/material/dialog';
import {SharedService} from "../../services/shared.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  token = '';
  userConnected = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    localStorage.getItem('token') ? this.userConnected = true : this.userConnected = false;
    }
  openAuthenticationDialog() {
    const dialogRef = this.dialog.open(AuthenticationComponent);

    dialogRef.afterClosed().subscribe();
  }
}
