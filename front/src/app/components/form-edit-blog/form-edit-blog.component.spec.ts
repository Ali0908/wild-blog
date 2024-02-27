import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditBlogComponent } from './form-edit-blog.component';

describe('FormEditBlogComponent', () => {
  let component: FormEditBlogComponent;
  let fixture: ComponentFixture<FormEditBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditBlogComponent]
    });
    fixture = TestBed.createComponent(FormEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
