import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaListComponent } from './especialista-list.component';

describe('EspecialistaListComponent', () => {
  let component: EspecialistaListComponent;
  let fixture: ComponentFixture<EspecialistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
