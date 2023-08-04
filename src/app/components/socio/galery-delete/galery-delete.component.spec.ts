import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryDeleteComponent } from './galery-delete.component';

describe('GaleryDeleteComponent', () => {
  let component: GaleryDeleteComponent;
  let fixture: ComponentFixture<GaleryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
