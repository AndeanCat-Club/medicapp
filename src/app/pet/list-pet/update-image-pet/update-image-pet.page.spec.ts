import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateImagePetPage } from './update-image-pet.page';

describe('UpdateImagePetPage', () => {
  let component: UpdateImagePetPage;
  let fixture: ComponentFixture<UpdateImagePetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateImagePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
