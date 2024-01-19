import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetRecordPage } from './pet-record.page';

describe('PetRecordPage', () => {
  let component: PetRecordPage;
  let fixture: ComponentFixture<PetRecordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
