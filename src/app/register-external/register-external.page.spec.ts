import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterExternalPage } from './register-external.page';

describe('RegisterExternalPage', () => {
  let component: RegisterExternalPage;
  let fixture: ComponentFixture<RegisterExternalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterExternalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
