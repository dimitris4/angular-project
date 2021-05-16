import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweditcollectionComponent } from './neweditcollection.component';

describe('NeweditcollectionComponent', () => {
  let component: NeweditcollectionComponent;
  let fixture: ComponentFixture<NeweditcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeweditcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweditcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
