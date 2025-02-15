import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingInitPage } from './loading-init.page';

describe('LoadingInitPage', () => {
  let component: LoadingInitPage;
  let fixture: ComponentFixture<LoadingInitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingInitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
