import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ObservableUserConnexion = new Subject<string>();
  constructor() { }

  userToken$ = this.ObservableUserConnexion.asObservable();

getUserConnexion(userToken: string) {
    this.ObservableUserConnexion.next(userToken);
  }
}
