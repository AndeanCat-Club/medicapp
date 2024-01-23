import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginExternalPage } from './login-external.page';

describe('LoginExternalPage', () => {
  let component: LoginExternalPage;
  let fixture: ComponentFixture<LoginExternalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginExternalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
