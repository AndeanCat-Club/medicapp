import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrPetPage } from './qr-pet.page';

describe('QrPetPage', () => {
  let component: QrPetPage;
  let fixture: ComponentFixture<QrPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
