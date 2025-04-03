import { TestBed } from '@angular/core/testing';

import { EstadoWalletDetalleService } from './estado-wallet-detalle.service';

describe('EstadoWalletDetalleService', () => {
  let service: EstadoWalletDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoWalletDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
