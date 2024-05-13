import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsByAuthorComponent } from './blogs-by-author.component';

describe('BlogsByAuthorComponent', () => {
  let component: BlogsByAuthorComponent;
  let fixture: ComponentFixture<BlogsByAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogsByAuthorComponent]
    });
    fixture = TestBed.createComponent(BlogsByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
