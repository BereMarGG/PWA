import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingLoginSuccessPage } from './loading-login-success.page';

describe('LoadingLoginSuccessPage', () => {
  let component: LoadingLoginSuccessPage;
  let fixture: ComponentFixture<LoadingLoginSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingLoginSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
