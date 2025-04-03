import { TestBed } from '@angular/core/testing';

import { EstadoConfirmacionService } from './estado-confirmacion.service';

describe('EstadoConfirmacionService', () => {
  let service: EstadoConfirmacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoConfirmacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
