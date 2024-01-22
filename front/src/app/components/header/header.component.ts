import {Component, OnInit} from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { MatDialog } from '@angular/material/dialog';
import {SharedService} from "../../services/shared.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userConnected: boolean | undefined;

  constructor(public dialog: MatDialog, private sharedSrv: SharedService) {
    this.sharedSrv.userConnected$.subscribe((userConnected) => {
      this.userConnected = userConnected;
    });
  }
  openAuthenticationDialog() {
    const dialogRef = this.dialog.open(AuthenticationComponent);

    dialogRef.afterClosed().subscribe();
  }

  ngOnInit(): void {
  }
}
