import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsByAuthorComponent } from './comments-by-author.component';

describe('CommentsByAuthorComponent', () => {
  let component: CommentsByAuthorComponent;
  let fixture: ComponentFixture<CommentsByAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsByAuthorComponent]
    });
    fixture = TestBed.createComponent(CommentsByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
