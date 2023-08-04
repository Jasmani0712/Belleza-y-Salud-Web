import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioListComponent } from './negocio-list.component';

describe('NegocioListComponent', () => {
  let component: NegocioListComponent;
  let fixture: ComponentFixture<NegocioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegocioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegocioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
