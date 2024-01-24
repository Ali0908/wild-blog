import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ObservableUserConnexion = new Subject<string>();
  private ObservableClickedBlogId = new BehaviorSubject<number>(0);
  private ObservableClickedArticleId = new BehaviorSubject<number>(0);
  constructor() { }
  userToken$ = this.ObservableUserConnexion.asObservable();
  clickedBlogId$ = this.ObservableClickedBlogId.asObservable();
  clickedArticleId$ = this.ObservableClickedArticleId.asObservable();


getUserConnexion(userToken: string) {
    this.ObservableUserConnexion.next(userToken);
  }

  getClickedBlogId(clickedBlogId: number) {
    this.ObservableClickedBlogId.next(clickedBlogId);
  }

  getClickedArticleId(articleId: number) {
    this.ObservableClickedArticleId.next(articleId);
  }
}
