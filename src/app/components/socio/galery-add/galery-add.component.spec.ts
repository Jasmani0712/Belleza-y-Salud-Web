import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryAddComponent } from './galery-add.component';

describe('GaleryAddComponent', () => {
  let component: GaleryAddComponent;
  let fixture: ComponentFixture<GaleryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
