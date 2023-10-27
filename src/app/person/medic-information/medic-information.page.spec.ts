import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicInformationPage } from './medic-information.page';

describe('MedicInformationPage', () => {
  let component: MedicInformationPage;
  let fixture: ComponentFixture<MedicInformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MedicInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
