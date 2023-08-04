import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSocioComponent } from './menu-socio.component';

describe('MenuSocioComponent', () => {
  let component: MenuSocioComponent;
  let fixture: ComponentFixture<MenuSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
