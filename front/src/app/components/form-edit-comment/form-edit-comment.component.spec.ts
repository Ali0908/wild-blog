import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditCommentComponent } from './form-edit-comment.component';

describe('FormEditCommentComponent', () => {
  let component: FormEditCommentComponent;
  let fixture: ComponentFixture<FormEditCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditCommentComponent]
    });
    fixture = TestBed.createComponent(FormEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
