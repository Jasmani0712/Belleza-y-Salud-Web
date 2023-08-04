import { TestBed } from '@angular/core/testing';

import { ComunicacionesService } from './comunicaciones.service';

describe('ComunicacionesService', () => {
  let service: ComunicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
