import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPetPage } from './list-pet.page';

describe('ListPetPage', () => {
  let component: ListPetPage;
  let fixture: ComponentFixture<ListPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
