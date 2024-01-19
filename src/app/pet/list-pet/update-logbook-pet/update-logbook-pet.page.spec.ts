import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLogbookPetPage } from './update-logbook-pet.page';

describe('UpdateLogbookPetPage', () => {
  let component: UpdateLogbookPetPage;
  let fixture: ComponentFixture<UpdateLogbookPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateLogbookPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
