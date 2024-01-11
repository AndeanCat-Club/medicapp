import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalRecordPage } from './medical-record.page';

describe('MedicalRecordPage', () => {
  let component: MedicalRecordPage;
  let fixture: ComponentFixture<MedicalRecordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MedicalRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
