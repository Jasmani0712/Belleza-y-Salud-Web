import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImagenesComponent } from './create-imagenes.component';

describe('CreateImagenesComponent', () => {
  let component: CreateImagenesComponent;
  let fixture: ComponentFixture<CreateImagenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateImagenesComponent]
    });
    fixture = TestBed.createComponent(CreateImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
