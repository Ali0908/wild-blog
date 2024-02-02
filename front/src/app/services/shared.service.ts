import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ObservableUserConnexion = new Subject<string>();
  private ObservableUserId = new BehaviorSubject<number>(0);
  private ObservableClickedBlogId = new BehaviorSubject<number>(0);
  private ObservableClickedArticleId = new BehaviorSubject<number>(0);
  private ObservableHideArticleBtn = new BehaviorSubject<boolean>(false);
  private ObservableHideBlogBtn = new BehaviorSubject<boolean>(false);
  private ObservableBlogsByAuthor = new Subject<any>();
  constructor() { }
  userToken$ = this.ObservableUserConnexion.asObservable();
  userId$ = this.ObservableUserId.asObservable();
  clickedBlogId$ = this.ObservableClickedBlogId.asObservable();
  clickedArticleId$ = this.ObservableClickedArticleId.asObservable();
  hideArticleBtn$ = this.ObservableHideArticleBtn.asObservable();
  hideBlogBtn$ = this.ObservableHideBlogBtn.asObservable();
  blogsByAuthor$ = this.ObservableBlogsByAuthor.asObservable();


getUserConnexion(userToken: string) {
    this.ObservableUserConnexion.next(userToken);
  }

  getHideArticleBtn(hideArticleBtn: boolean) {
    this.ObservableHideArticleBtn.next(hideArticleBtn);
  }
  getHideBlogBtn(hideBlogBtn: boolean) {
    this.ObservableHideBlogBtn.next(hideBlogBtn);
  }

  getClickedBlogId(clickedBlogId: number) {
    this.ObservableClickedBlogId.next(clickedBlogId);
  }

  getClickedArticleId(articleId: number) {
    this.ObservableClickedArticleId.next(articleId);
  }
  getUserId(userId: number) {
    this.ObservableUserId.next(userId);
  }
  getAllBlogsByAuthor(blogs: any) {
    this.ObservableBlogsByAuthor.next(blogs);
  }
}
