import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByAuthorComponent } from './articles-by-author.component';

describe('ArticlesByAuthorComponent', () => {
  let component: ArticlesByAuthorComponent;
  let fixture: ComponentFixture<ArticlesByAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesByAuthorComponent]
    });
    fixture = TestBed.createComponent(ArticlesByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
