import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSocioComponent } from './admin-socio.component';

describe('AdminSocioComponent', () => {
  let component: AdminSocioComponent;
  let fixture: ComponentFixture<AdminSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
