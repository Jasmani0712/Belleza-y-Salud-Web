import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesabilitarNegocioComponent } from './desabilitar-negocio.component';

describe('DesabilitarNegocioComponent', () => {
  let component: DesabilitarNegocioComponent;
  let fixture: ComponentFixture<DesabilitarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesabilitarNegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesabilitarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
