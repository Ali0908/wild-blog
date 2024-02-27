import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditArticleComponent } from './form-edit-article.component';

describe('FormEditArticleComponent', () => {
  let component: FormEditArticleComponent;
  let fixture: ComponentFixture<FormEditArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditArticleComponent]
    });
    fixture = TestBed.createComponent(FormEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
