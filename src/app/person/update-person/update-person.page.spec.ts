import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePersonPage } from './update-person.page';

describe('UpdatePersonPage', () => {
  let component: UpdatePersonPage;
  let fixture: ComponentFixture<UpdatePersonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
